    package br.com.fiap.chat.chat;

    import org.springframework.amqp.rabbit.core.RabbitTemplate;
    import org.springframework.messaging.simp.SimpMessagingTemplate;
    import org.springframework.stereotype.Service;

    @Service
    public class ChatMessageSender {

        private final SimpMessagingTemplate messagingTemplate;
        private final RabbitTemplate rabbitTemplate;

        public ChatMessageSender(RabbitTemplate rabbitTemplate, SimpMessagingTemplate messagingTemplate) {
            this.messagingTemplate = messagingTemplate;
            this.rabbitTemplate = rabbitTemplate;
        }

        public void sendMessage(String message) {
            messagingTemplate.convertAndSend("/topic/messages", message);
            String queue = "chat-queue";
            rabbitTemplate.convertAndSend(queue, message);

        }
    }
