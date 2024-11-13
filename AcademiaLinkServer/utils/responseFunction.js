// this is an outline which we are going to follow for all the responses. nothing much!!

export const responseFunction = (res, status, message, data, ok) => {
  res.status(status).json({
    message,
    data,
    ok,
  });
};
