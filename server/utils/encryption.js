import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const algorithm = 'aes-256-cbc'; // The encryption standard
// Key must be 32 characters (256 bits)
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); 
const ivLength = 16; // For AES, this is always 16

// Function to Encrypt Text
export const encrypt = (text) => {
    if (!text) return text;
    
    // Create a random Initialization Vector (IV) for every encryption
    // This ensures "Hello" looks different every time it's encrypted
    const iv = crypto.randomBytes(ivLength);
    
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    
    // Return format: IV:EncryptedData
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

// Function to Decrypt Text
export const decrypt = (text) => {
    if (!text) return text;
    
    try {
        const textParts = text.split(':');
        
        // If text doesn't have a colon, it might be old unencrypted data. Return as is.
        if (textParts.length < 2) return text;

        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        
        return decrypted.toString();
    } catch (error) {
        // If decryption fails (e.g., wrong key), return original text to prevent crash
        return text;
    }
};