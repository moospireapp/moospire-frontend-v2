// const { EventEmitter } = require("fbemitter");

class serviceUtils {
  timestamp = new Date().getTime();
  //   emitter = new EventEmitter();

  urlHash(url: string) {
    return url.includes("?")
      ? `${url}&timestamp=${this.timestamp}`
      : `${url}?timestamp=${this.timestamp}`;
  }

  setCookie(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires}; path=/`;
  }

  getStorage({
    storage_name,
    storage_type = "string",
  }: {
    storage_name: string;
    storage_type?: "string" | "object";
  }): string | object | null {
    if (typeof window === "undefined") return null;
    const stored_data = localStorage.getItem(storage_name);
    return storage_type === "string"
      ? stored_data
      : stored_data
      ? JSON.parse(stored_data)
      : null;
  }

  setStorage({
    storage_name,
    storage_value,
    storage_type = "string",
  }: {
    storage_name: string;
    storage_value: string | number | object;
    storage_type?: "string" | "object";
  }): void {
    if (typeof window === "undefined") return;
    if (storage_type === "string") {
      localStorage.setItem(storage_name, storage_value as string);
    } else {
      localStorage.setItem(storage_name, JSON.stringify(storage_value));
    }
  }

  removeStorage(storage_name: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(storage_name);
  }

  createAndClickAnchor(href: string, target = "_self") {
    const anchor = document.createElement("a");

    anchor.href = href;
    anchor.target = target;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  extractStringInitials(name?: string): string {
    if (!name || typeof name !== "string") return ""; // Handle undefined or non-string cases

    const [firstName = "", lastName = ""] = name.trim().split(" ");
    return (
      (firstName[0] || "").toUpperCase() + (lastName[0] || "").toUpperCase()
    );
  }
}

export default new serviceUtils();
