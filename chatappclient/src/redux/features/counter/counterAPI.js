export default function incCount() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(200);
    }, 2000);
  });
}
