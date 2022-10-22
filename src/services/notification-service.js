export class NotificationService {
  constructor(dispatch, action) {
    this.dispatch = dispatch;
    this.action = action;
  }

  showSuccess(title, message) {
    this.dispatch(
      this.action({
        title,
        message,
        status: "success",
      })
    );
  }
  showError(title, message) {
    this.dispatch(
      this.action({
        title,
        message,
        status: "error",
      })
    );
  }
  showPending(title, message) {
    this.dispatch(
      this.action({
        title,
        message,
        status: "pending",
      })
    );
  }
}
