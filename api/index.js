require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Payment } = require('mercadopago');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Verifica se o token existe
if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
    console.error("ERRO: MERCADOPAGO_ACCESS_TOKEN não está definido");
}

// Configura as credenciais do Mercado Pago
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

// Rota unificada para processar o pagamento transparente
app.post('/api/process_payment', async (req, res) => {
    try {
        const { title, price, payer_email, payer_cpf, payment_method, formData } = req.body;

        const payment = new Payment(client);

        if (payment_method === 'pix') {
            // Fluxo PIX NATIVO via v1/orders
            const crypto = require('crypto');
            const idempotencyKey = crypto.randomUUID();

            const response = await fetch('https://api.mercadopago.com/v1/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
                    'X-Idempotency-Key': idempotencyKey
                },
                body: JSON.stringify({
                    type: "online",
                    external_reference: "curso_dji_" + Date.now(),
                    total_amount: (Number(price) || 1.50).toFixed(2),
                    payer: {
                        email: payer_email,
                        first_name: "Comprador", 
                        identification: {
                            type: 'CPF',
                            number: payer_cpf || '19119119100'
                        }
                    },
                    transactions: {
                        payments: [
                            {
                                amount: (Number(price) || 1.50).toFixed(2),
                                payment_method: {
                                    id: "pix",
                                    type: "bank_transfer"
                                }
                            }
                        ]
                    }
                })
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("Erro MP Orders:", JSON.stringify(result, null, 2));
                return res.status(response.status).json(result);
            }

            // Log para ver a estrutura de sucesso
            console.log("SUCESSO MP Orders:", JSON.stringify(result, null, 2));

            // O retorno da API v1/orders é um pouco diferente
            const pixPayment = result.transactions?.payments?.[0];

            res.json({
                status: result.status,
                id: result.id, // O Order ID que o Mercado Pago exige no painel!
                qr_code_base64: pixPayment?.payment_method?.qr_code_base64,
                qr_code: pixPayment?.payment_method?.qr_code
            });
        } else if (formData) {
            // Fluxo CARTÃO DE CRÉDITO via v1/orders
            const crypto = require('crypto');
            
            const response = await fetch('https://api.mercadopago.com/v1/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
                    'X-Idempotency-Key': crypto.randomUUID()
                },
                body: JSON.stringify({
                    type: "online",
                    external_reference: "curso_dji_cc_" + Date.now(),
                    total_amount: (Number(formData.transaction_amount) || 1.50).toFixed(2),
                    payer: {
                        email: formData.payer?.email,
                        first_name: "Comprador",
                        identification: formData.payer?.identification
                    },
                    transactions: {
                        payments: [
                            {
                                amount: (Number(formData.transaction_amount) || 1.50).toFixed(2),
                                payment_method: {
                                    id: formData.payment_method_id,
                                    type: "credit_card",
                                    token: formData.token,
                                    installments: formData.installments || 1
                                }
                            }
                        ]
                    }
                })
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("Erro MP Orders (Cartão):", JSON.stringify(result, null, 2));
                return res.status(response.status).json(result);
            }

            res.json({
                status: result.status,
                id: result.id
            });
        } else {
            res.status(400).json({ error: 'Método de pagamento não suportado ou dados incompletos.' });
        }

    } catch (error) {
        console.error("Erro ao processar pagamento:", error);
        res.status(500).json({ error: 'Erro interno ao processar pagamento.' });
    }
});

// Serve os arquivos estáticos quando rodando localmente
const path = require('path');
app.use(express.static(path.join(__dirname, '../')));

// Permite rodar o servidor localmente com "node api/index.js"
if (process.env.NODE_ENV !== 'production') {
    const localPort = process.env.PORT || 3000;
    app.listen(localPort, () => {
        console.log(`🚀 Servidor rodando localmente na porta ${localPort}`);
        console.log(`👉 Acesse: http://localhost:${localPort}/checkout.html`);
    });
}

module.exports = app;
