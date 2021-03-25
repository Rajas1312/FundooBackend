const amqp = require("amqplib/callback_api");
const EventEmitter = require("events");
const event = new EventEmitter();
var ee = require("event-emitter");
const auth = require("../auth/nodemailer");

class Subscriber {
    consumeMessage = (token, maildata, callback) => {
        try {
            console.log("inside subsciriber");
            amqp.connect("amqp://localhost", (error, connection) => {
                if (error) {
                    return callback(error, null);
                }
                console.log("inside subsciriber0");
                connection.createChannel((error, channel) => {
                    if (error) {
                        return callback(error, null);
                    }
                    console.log("inside subsciriber1");
                    let queueName = "EmailInQueues1";
                    channel.assertQueue(queueName, {
                        durable: false,
                    });
                    console.log("inside subsciriber2");
                    channel.consume(queueName, (msg) => {
                        console.log("mess");
                        console.log(`Message consumes: ${msg.content.toString()}`);
                        const message = `${msg.content.toString()}`;
                        console.log("mess ", message);

                        const userInfo = {
                            token: token,
                            emailId: message,
                        };
                        console.log("maildata ", maildata);
                        channel.ack(msg);
                        return callback(null, msg.content.toString());
                    });
                });
            });
        } catch (error) {
            console.log("error", error);
        }
    };
}
module.exports = new Subscriber();