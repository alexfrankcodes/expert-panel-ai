const STORAGE_KEY = 'encryptedApiKey';

async function generateKey() {
  return await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

async function encryptData(data: string) {
  const key = await generateKey();
  const encodedData = new TextEncoder().encode(data);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    encodedData
  );
  const exportedKey = await window.crypto.subtle.exportKey('raw', key);
  return {
    encryptedData: Array.from(new Uint8Array(encryptedData)),
    iv: Array.from(iv),
    key: Array.from(new Uint8Array(exportedKey))
  };
}

async function decryptData(encryptedData: number[], iv: number[], key: number[]) {
  const importedKey = await window.crypto.subtle.importKey(
    'raw',
    new Uint8Array(key),
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(iv) },
    importedKey,
    new Uint8Array(encryptedData)
  );
  return new TextDecoder().decode(decryptedData);
}

export async function saveEncryptedApiKey(apiKey: string) {
  const encryptedData = await encryptData(apiKey);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(encryptedData));
}

export async function getEncryptedApiKey(): Promise<string | null> {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) return null;
  const { encryptedData, iv, key } = JSON.parse(storedData);
  return await decryptData(encryptedData, iv, key);
}