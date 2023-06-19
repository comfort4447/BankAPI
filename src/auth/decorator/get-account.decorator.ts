// import { 
//     createParamDecorator, 
//     ExecutionContext } from '@nestjs/common';

// export const GetAccount = createParamDecorator(
//   (
//     data: string | undefined, 
//     ctx: ExecutionContext,
//     ) => {
//     const request: Express.Request = ctx
//     .switchToHttp()
//     .getRequest();
//     if (data) {
//         return request.Accounts[data];
//     }
//     return request.Accounts;
//   },
// );