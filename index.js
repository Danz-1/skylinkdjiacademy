require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago');

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

// Rota para criar a preferência
app.post('/api/create_preference', async (req, res) => {
    try {
        const { title, quantity, price, payer_email, payment_method } = req.body;

        const body = {
            items: [
                {
                    title: title || 'Curso de Pilotagem de Drones DJI',
                    quantity: Number(quantity) || 1,
                    unit_price: Number(price) || 10.00,
                    currency_id: 'BRL',
                }
            ],
            payer: {
                email: payer_email || 'test_user@testuser.com'
            }
        };

        if (payment_method === 'pix') {
            body.payment_methods = {
                excluded_payment_types: [
                    { id: "credit_card" },
                    { id: "debit_card" },
                    { id: "ticket" },
                    { id: "account_money" }
                ],
                default_payment_method_id: "pix" // Força o Mercado Pago a abrir direto na tela do PIX universal
            };
        } else if (payment_method === 'credit') {
            body.payment_methods = {
                excluded_payment_types: [
                    { id: "ticket" },
                    { id: "bank_transfer" }
                ]
            };
        }

        const preference = new Preference(client);
        const result = await preference.create({ body });
        
        res.json({
            id: result.id,
            init_point: result.init_point
        });
    } catch (error) {
        console.error("Erro ao criar preferência:", error);
        res.status(500).json({ error: 'Erro ao criar preferência no Mercado Pago' });
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
