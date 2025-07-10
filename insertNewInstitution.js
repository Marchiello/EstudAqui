// Adicione este script em seu script.js ou antes do fechamento do body

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault(); // evita envio padrão do form

        // Pega os valQores preenchidos
        const formData = {
            nomeInstituicao: document.getElementById("username").value.trim(),
            email: document.getElementById("email").value.trim(),
            telefone: registerForm.querySelectorAll("input")[2].value.trim(),
            cnpj: registerForm.querySelectorAll("input")[3].value.trim(),
            cep: registerForm.querySelectorAll("input")[4].value.trim(),
            endereco: registerForm.querySelectorAll("input")[5].value.trim(),
            numero: registerForm.querySelectorAll("input")[6].value.trim(),
            bairro: registerForm.querySelectorAll("input")[7].value.trim(),
            senha: document.getElementById("password").value.trim(),
            confirmarSenha: document.getElementById("confirmPassword").value.trim()
        };

        // Exemplo de exibição no console
        console.log("Dados preenchidos:", formData);

        // Aqui você pode enviar via fetch/AJAX para o backend ou outra ação

        document.addEventListener("DOMContentLoaded", () => {
            const registerForm = document.getElementById("registerForm");

            registerForm.addEventListener("submit", function(event) {
                event.preventDefault();

                const formData = {
                    institutionName: document.getElementById("username").value.trim(),
                    conciseInstitutionName: document.getElementById("username").value.trim(), // ajuste conforme desejar
                    institutionImageURL: "", // se houver campo no form, coloque aqui
                    backgroundImage: "",
                    verified: false,
                    routeMaps: [], // pode adaptar para pegar do form
                    ingressModes: [], // idem
                    courses: [] // idem
                };

                console.log("Dados preenchidos:", formData);

                // ✅ Envia os dados via fetch POST
                fetch('/addInstitution', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    alert(data.message || "Instituição cadastrada com sucesso!");
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert("Erro ao cadastrar instituição.");
                });
            });
        });

    });
});
