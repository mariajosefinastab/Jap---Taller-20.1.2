const API_SURVEYS_URL = "http://localhost:3006/surveys";
const token = localStorage.getItem("token");

// Verificar autenticación
if (!token) {
  alert("Debes iniciar sesión primero.");
  window.location.href = "login.html";
}

// Crear encuesta
document.getElementById("newSurvey")?.addEventListener("click", async () => {
  const title = prompt("Ingresa el título de la encuesta:");
  const description = prompt("Ingresa la descripción de la encuesta:");

  if (title && description) {
    try {
      const response = await fetch(`${API_SURVEYS_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        alert("Encuesta creada exitosamente.");
        window.location.reload();
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al crear encuesta:", error);
      alert("Ocurrió un error. Intenta nuevamente.");
    }
  }
});

// Cargar encuestas
async function loadSurveys() {
  try {
    const response = await fetch(`${API_SURVEYS_URL}`, {
      headers: { Authorization: token },
    });

    if (response.ok) {
      const surveys = await response.json();
      const tableBody = document.getElementById("surveyTable");
      tableBody.innerHTML = "";

      surveys.forEach((survey) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${survey.title}</td>
          <td>${survey.description}</td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="respondSurvey(${survey.id})">Responder</button>
            <button class="btn btn-danger btn-sm" onclick="deleteSurvey(${survey.id})">Eliminar</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    } else {
      const data = await response.json();
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error("Error al cargar encuestas:", error);
    alert("Ocurrió un error. Intenta nuevamente.");
  }
}

loadSurveys();