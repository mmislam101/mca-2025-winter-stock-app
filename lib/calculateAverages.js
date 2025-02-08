export function calculateRunningAverage(data, period) {
    let averages = [];
    for (let i = 0; i < data.length; i++) {
      const subset = data.slice(Math.max(i - period + 1, 0), i + 1);
      const sum = subset.reduce((acc, value) => acc + parseFloat(value.close), 0);
      const average = sum / subset.length;
      averages.push({ datetime: data[i].datetime, average });
    }
    return averages;
  }
  