import { Kafka, Consumer } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'nextjs-consumer',
  brokers: ['localhost:9092'],
});

export const consumeMessages = async (
  topic: string,
  groupId: string,
  handleMessage: (message: string) => void
): Promise<void> => {
  const consumer: Consumer = kafka.consumer({ groupId });
  await consumer.connect();
  console.log('Kafka consumer connected: ', groupId);

  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    eachMessage: async ({ topic, partition, message }) => {
      const messageValue = message.value?.toString();
      if (messageValue) {
        handleMessage(messageValue);
      }
    },
  });
};
