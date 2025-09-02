const token = localStorage.getItem("token");
const res = await fetch("/api/protected", {
  headers: {
    "Authorization": `Bearer ${token}`,
  },
});