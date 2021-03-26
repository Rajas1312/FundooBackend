
const amqp = require("amqplib/callback_api");

class Publish {
    getMessage = (userInfo, callback) => {
        amqp.connect("amqp://localhost", (error, connection) => {
            if (error) {
                return callback(error, null);
            }
            connection.createChannel((error, channel) => {
                if (error) {
                    return callback(error, null);
                }
                let queueName = "EmailInQueues1";
                let message = userInfo.emailId;
                channel.assertQueue(queueName, {
                    durable: false,
                });
                channel.sendToQueue(queueName, Buffer.from(message));
                setTimeout(() => {
                    console.log("connection close");
                    connection.close();
                }, 1000);
            });
        });
    };
}

module.exports = new Publish();