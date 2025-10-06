require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const path = require('path')

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist')))
}

// Helpers auth
const SESSION_COOKIE_NAME = 'session'
const isProduction = process.env.NODE_ENV === 'production'

function signSessionToken() {
    const secret = process.env.AUTH_SECRET
    if (!secret) throw new Error('AUTH_SECRET manquante côté serveur')
    return jwt.sign({ sub: 'auth' }, secret, { expiresIn: '7d' })
}

function verifySessionToken(token) {
    const secret = process.env.AUTH_SECRET
    if (!secret) throw new Error('AUTH_SECRET manquante côté serveur')
    try {
        jwt.verify(token, secret)
        return true
    } catch {
        return false
    }
}

function requireAuth(req, res, next) {
    const token = req.cookies?.[SESSION_COOKIE_NAME]
    if (!token || !verifySessionToken(token)) {
        return res.status(401).json({ error: 'Non authentifié' })
    }
    next()
}

// Healthcheck
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' })
})

// Session endpoints
app.get('/api/session', (req, res) => {
    const token = req.cookies?.[SESSION_COOKIE_NAME]
    const authenticated = !!token && verifySessionToken(token)
    res.json({ authenticated })
})

app.post('/api/login', (req, res) => {
    const pass = req.body?.password
    const expected = process.env.AUTH_PASSCODE
    if (!expected) {
        return res.status(500).json({ error: 'AUTH_PASSCODE manquante côté serveur' })
    }
    if (typeof pass !== 'string' || pass.length === 0) {
        return res.status(400).json({ error: 'Mot de passe requis' })
    }
    if (pass !== expected) {
        return res.status(401).json({ error: 'Mot de passe invalide' })
    }
    try {
        const token = signSessionToken()
        res.cookie(SESSION_COOKIE_NAME, token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: isProduction,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        })
        res.json({ ok: true })
    } catch (e) {
        res.status(500).json({ error: 'Erreur serveur' })
    }
})

app.post('/api/logout', (req, res) => {
    res.clearCookie(SESSION_COOKIE_NAME, { path: '/' })
    res.json({ ok: true })
})

// Image generation endpoint
app.post('/api/images', requireAuth, async (req, res) => {
    try {
        const apiKey = process.env.OPENAI_API_KEY
        if (!apiKey) {
            return res
                .status(500)
                .json({ error: 'OPENAI_API_KEY manquante côté serveur' })
        }

        const { prompt, size } = req.body || {}
        if (typeof prompt !== 'string' || prompt.trim().length < 3) {
            return res.status(400).json({ error: 'Prompt invalide' })
        }

        // openai est ESM-only, on le charge dynamiquement en CommonJS
        const { default: OpenAI } = await import('openai')
        const client = new OpenAI({ apiKey })

        const image = await client.images.generate({
            model: 'dall-e-3',
            prompt: prompt.trim(),
            size: typeof size === 'string' ? size : '1024x1024'
        })

        const first = image?.data?.[0]
        if (!first?.url) {
            return res.status(502).json({ error: "Réponse d'OpenAI invalide" })
        }

        res.json({ url: first.url, revised_prompt: first.revised_prompt || null })
    } catch (err) {
        const message = err && typeof err.message === 'string' ? err.message : String(err)
        res.status(500).json({ error: message })
    }
})

// Serve React app for all non-API routes in production
if (process.env.NODE_ENV === 'production') {
    app.get('*', (_req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'))
    })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`[server] API démarrée sur http://localhost:${PORT}`)
})


