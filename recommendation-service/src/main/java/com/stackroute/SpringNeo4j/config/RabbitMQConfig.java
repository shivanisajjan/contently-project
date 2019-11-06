package com.stackroute.SpringNeo4j.config;


import com.stackroute.SpringNeo4j.service.RabbitMQConsumer;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Value("${registry.rabbitmq.queue}")
    private String queueName;

    @Value("${registry.rabbitmq.exchange}")
    private String exchange;

    @Value("${registry.rabbitmq.routingkey}")
    private String routingkey;


    @Bean
    Queue queue() {
        return new Queue(queueName, false);
    }

    @Bean
    DirectExchange exchange() {
        return new DirectExchange(exchange);
    }

    @Bean
    Binding binding(Queue queue, DirectExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(routingkey);
    }

    @Value("${profile.rabbitmq.queue}")
    private String queueName1;

    @Value("${profile.rabbitmq.exchange}")
    private String exchange1;

    @Value("${profile.rabbitmq.routingkey}")
    private String routingkey1;

    @Bean
    Queue queue1() {
        return new Queue(queueName1, false);
    }

    @Bean
    DirectExchange exchange1() {
        return new DirectExchange(exchange1);
    }

    @Bean
    Binding binding1(Queue queue1, DirectExchange exchange1) {
        return BindingBuilder.bind(queue1).to(exchange1).with(routingkey1);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }


    @Bean
    public RabbitMQConsumer listener(){
        return new RabbitMQConsumer();
    }
}
