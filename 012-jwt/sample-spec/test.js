/**
    JWT standalone samples.
*/
const assert = require('assert')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')


const JWT_SECRET_KEY = 'my-special-key'


// describe('Use secret key.', () => {
//     it('sign', () => {

//         const token = jwt.sign({ userId : 123 }, JWT_SECRET_KEY)
//         console.log('token is', token)
//     })
// })


it('basic usage.', () => {

    // Create a jwt token.
    const token = jwt.sign({ userId : 123 }, JWT_SECRET_KEY)
    console.log('token:', token)

    console.log('-------')

    // Check the values.
    const [ header, payload, signature ] = token.split('.')
    console.log('header:', header)
    console.log('payload:', payload)
    console.log('signature:', signature)

    console.log('-------')

    // Decode using base64.
    console.log('header:', Buffer.from(header, 'base64').toString())
    console.log('payload:', Buffer.from(payload, 'base64').toString())

    console.log('-------')

    // Verify.
    const data = jwt.verify(token, JWT_SECRET_KEY)
    console.log('data:', data)

    // Verify with a wrong key.
    try {
        jwt.verify(token, 'wrong key')
    } catch (err) {
        console.log('err:name:', err.name)
    }
})

it('sign with a private key, and also verify with the same key', () => {

    // Sign with a private key.
    const privateKey = fs.readFileSync(path.join(__dirname, '..', 'keys', 'my-rsa'))
    const token = jwt.sign({ userId : 123 }, privateKey, { algorithm : 'HS256' })
    console.log('token:', token)

    // Verify with the private key.
    const data = jwt.verify(token, privateKey, { algorithm : 'HS256' })
    console.log('data:', data)
})

// it('sign with a private key, and verify with a PUBLIC key', () => {

//     const jwksClient = require('jwks-rsa')

//     // Sign with a private key.
//     const privateKey = fs.readFileSync(path.join(__dirname, '..', 'keys', 'my-rsa'))
//     const token = jwt.sign({ userId : 123 }, privateKey, { algorithm : 'RS256' })
//     console.log('token:', token)

//     // Verify with the private key.
//     const publicKey = fs.readFileSync(path.join(__dirname, '..', 'keys', 'my-rsa.pub'))
//     const data = jwt.verify(token, publicKey, { algorithm : 'RS256' })
//     console.log('data:', data)
// })





