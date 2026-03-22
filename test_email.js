
async function testEmail() {
  const url = 'https://api.mailersend.com/v1/email';
  const apiKey = 'mlsn.94f4d5973d85637323311559dd931b7e65cf06585b69e22698c56a89f0925f53';
  
  const payload = {
    from: {
      email: "admin@girafatech.com",
      name: "Girafa Tech"
    },
    to: [
      {
        email: "abel.souza.magalhaes@hotmail.com"
      }
    ],
    template_id: "0p7kx4xn8ovg9yjr"
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('--- RESULTADO DO TESTE ---');
    console.log('Status:', response.status);
    console.log('Resposta:', JSON.stringify(data, null, 2));
    
    if (response.status >= 200 && response.status < 300) {
      console.log('✅ SUCESSO! O e-mail foi enviado.');
    } else {
      console.log('❌ ERRO! Verifique a mensagem acima.');
    }
  } catch (error) {
    console.error('--- ERRO FATAL ---');
    console.error(error);
  }
}

testEmail();
