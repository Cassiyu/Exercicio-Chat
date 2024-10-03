let socket = new SockJS('/chat-websocket');
let stompClient = Stomp.over(socket);

stompClient.connect({}, function () {
    stompClient.subscribe('/topic/messages', function (message) {
        let messagesDiv = document.getElementById("messages");
        let messageSection = document.createElement("section");
        let data = message.body;
        let username = data.split(":")[0]
        let userMessage = data.split(":")[1]
        messageSection.innerHTML = `
                <section class="message">
                    <img src="https://avatar.iran.liara.run/public/boy?username=${username}" alt="avatar" class="avatar">
                    <div class="nes-balloon from-left">
                        <p>${userMessage}</p>
                    </div>
                </section>
            `
        messagesDiv.appendChild(messageSection)
        scrollToBottom()
    });
});

window.onload = scrollToBottom;

function scrollToBottom() {
    let anchor = document.getElementById("scroll-anchor");
    anchor.scrollIntoView({ behavior: "smooth" });
}