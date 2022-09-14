const socket = io();
document.addEventListener("DOMContentLoaded", async () => {
  async function templates_fetch(url) {
    let res = await fetch(url);
    return await res.text();
  }

  async function html_buil(url, contexto) {
    const plantilla = await templates_fetch(url);
    const generate = Handlebars.compile(plantilla);
    return generate(contexto);
  }

  socket.on("MENSAJES", async (mensajes) => {
    console.table(mensajes);

    let html = await html_buil("templates/chat.handlebars", mensajes);
    document.getElementById("chat").innerHTML = html;
  });

  templates_fetch("templates/input-chat.handlebars").then((res) => {
    document.getElementById("input").innerHTML = res;
  });
});
