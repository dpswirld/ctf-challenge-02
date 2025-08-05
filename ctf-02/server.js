const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const app_internal = express();
const PORT_INTERNAL = process.env.PORT_INTERNAL || 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Root Endpoint
app.get('/api', (req, res) => {
    res.json({
        status: 'success',
        message: 'Leet Oracle API',
        endpoints: {
            '/api/.admin': 'Get Oracle Config',
            '/api/hbar-price': 'Get HBAR Price',
 
        }
    });
});

app.get('/api/.admin', (req, res) => {
    res.json({
            status: 'error',
            message: 'Access denied. This endpoint is only accessible from localhost @ 3001.'
        });
});

// Secure admin endpoint that only accepts internal connections
app_internal.get('/api/.admin', (req, res) => {
    
    res.json({
        oracle_wallet_address: "0x67d8d32e9bf1a9968a5ff53b87d777aa8ebbee69",
        oracle_private_key: "0x105d050185ccb907fba04dd92d8de9e32c18305e097ab41dadda21489a211524",
        flag: "CTF{ssrf_got_me_the_key}"
    });
});


// HBAR Price
app.get('/api/hbar-price', async (req, res) => {
    try {
        const url = req.query.url;
        const response = await axios.get(url, {
            timeout: 5000,
            headers: {
                'X-CMC_PRO_API_KEY': 'fa63f9aa-5569-453b-97cc-e5b1712f2952'
            }
        });

        // res.json({
        //     usd: response.data.data.HBAR.quote.USD.price.toFixed(4)
        // });

        res.json(response.data)

        
    } catch (error) {
        console.error(`Error fetching external API:`, error.message);
        res.json({error: error.message})
    }
    
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Leet Oracle server running on *:${PORT}`);
    
});

// Start the server
app_internal.listen(PORT_INTERNAL, 'localhost', () => {
    console.log(`🔒 Leet Oracle internal server running on localhost:${PORT_INTERNAL}`);
    
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down Leet Oracle server...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down Leet Oracle server...');
    process.exit(0);
});
