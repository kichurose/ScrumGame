export class SignUpRequest {
  public name: string;
  public password: number;
  constructor(name: string, password: number) {
    this.name = name;
    this.password = password;
  }
}
