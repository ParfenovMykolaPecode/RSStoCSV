const convertToCSV = (data) => {
    let csv = [];

    csv.push('Title,Link');
  
    data.forEach(item => {
      const title = item.title.replace(/"/g, '""');
      const link = item.link.replace(/"/g, '""');
      const line = `"${title}","${link}"`;
      csv.push(line);
    });
  
    return csv.join('\n');
  };
  
  module.exports = { convertToCSV };
  