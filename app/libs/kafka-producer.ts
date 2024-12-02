import { Kafka, Producer } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'nextjs-producer',
  brokers: ['localhost:9092'],
});

let producer: Producer | null = null;

export const getProducer = async (): Promise<Producer> => {
  if (!producer) {
    producer = kafka.producer();
    await producer.connect();
    console.log('Kafka producer connected');
  }
  return producer;
};

export const sendMessage = async (
  topic: string,
  messages: string[]
): Promise<void> => {
  const producer = await getProducer();
  try {
    await producer.send({
      topic,
      messages: messages.map((message) => ({ value: message })),
    });
    console.log(`Messages sent to topic "${topic}"`);
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};
