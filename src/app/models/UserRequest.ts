export class UserRequest {
  public name: string;
  public roomId: string;
  constructor(name: string, roomId: string) {
    this.name = name;
    this.roomId = roomId;
  }
}
