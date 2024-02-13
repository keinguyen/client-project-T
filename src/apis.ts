const subjectKey = {
  'tickets.api.getList': 'GET',
  'tickets.api.createTicket': 'POST',
};

export const requestAPI = async <T>(params: {
  body?: T;
  subject: keyof typeof subjectKey;
}): Promise<T> => {
  const { body, subject } = params;

  const result = await fetch(
    new URL(
      `.netlify/functions/${subject.split('.')[0]}`,
      'http://localhost:8888/'
    ),
    {
      mode: 'cors',
      body: body ? JSON.stringify(body) : undefined,
      method: subjectKey[subject],
      headers: { subject, 'Content-Type': 'application/json' },
    }
  )
    .then((e) => e.json())
    .catch((error) => {
      console.log('asdasdasd: ', error);
    });

  console.log(`End request ${subject}`);
  return result;
};
