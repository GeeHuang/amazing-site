// $('#bottomalign').css('text-align', 'center');

$.getJSON('../test_feed.json', function(data) {
  var content = data.content;
  var words = [];
  for (let index = 0; index < content.length; index++) {
    var body = [content[index].content.bodyHtml];
    body.forEach(b => {
      if (b) {
        //console.log(b);
        var str = b.split('</a>').pop();
        //console.log(str);
        var strArr = str.split(' ').filter(Boolean);
        words.push(...strArr);
      }
    });
  }
  //console.log(strFrequency(words));
  var wordCount = strFrequency(words);
  var labels = Object.keys(wordCount);
  var counts = Object.values(wordCount);
  console.log(wordCount);

  //Chart.js

  var ctx = document.getElementById('myChart').getContext('2d');
  var myPieChart = new Chart(ctx, {
    type: 'bar',
    data: {
      datasets: [
        {
          label: '# of word counts',
          data: counts,
          borderWidth: 100
        }
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: labels
    },
    options: {
      scales: {
        xAxes: [
          {
            barPercentage: 0.5,
            barThickness: 100,
            maxBarThickness: 8,
            minBarLength: 2,
            gridLines: {
              offsetGridLines: true
            }
          }
        ]
      }
    }
  });
});

const strFrequency = function(stringArr) {
  return stringArr.reduce((count, word) => {
    count[word] = (count[word] || 0) + 1;
    return count;
  }, {});
};
