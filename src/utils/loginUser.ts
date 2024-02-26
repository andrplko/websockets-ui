import { users } from '../db';
import {
  RequestLogin,
  RequestLoginData,
  ResponseLogin,
  ResponseLoginData,
} from '../types';

const loginUser = (message: Buffer, id: number) => {
  const parsedMessage: RequestLogin = JSON.parse(message.toString());
  const userData: RequestLoginData = JSON.parse(parsedMessage.data);

  const existingUser = users.find((user) => user.name === userData.name);

  if (existingUser) {
    const errorData = JSON.stringify({
      error: true,
      errorText: 'User with the same name already exists.',
    });

    return JSON.stringify({ ...parsedMessage, data: errorData });
  }

  users.push(userData);

  const data: ResponseLoginData = {
    name: userData.name,
    index: id,
    error: false,
    errorText: '',
  };

  const response: ResponseLogin = {
    ...parsedMessage,
    data: JSON.stringify(data),
  };

  return JSON.stringify(response);
};

export default loginUser;
