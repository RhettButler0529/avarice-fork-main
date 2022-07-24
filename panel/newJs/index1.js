
let lobbyData



function renderChart() {
	$(function(e) {
		/*-----echart1-----*/
		var options = {
            dataLabels: {
                enabled: false
              },
              legend: {
                show: false
              },
			chart: {
				height: '260px',
				type: "line",
				stacked: false,
				toolbar: {
                    show: false
				},
				dropShadow: {
					enabled: true,
					opacity: 0.2,
				},

			},
			colors: ["#f96a33", "#f5c6b830"],
 			
            stroke: {
				curve: "smooth",
				width: [3, 3, 0],
				dashArray: [0, 4],
				lineCap: "round"
			},
			grid: {
				padding: {
					left: 10,
					right: 10
				},
				strokeDashArray: 3
			},
			markers: {
				size: 0,
				hover: {
					size: 0
				}
			},
			series: [{
				name: "BNB Entry",
				type: 'line',
				data: []
			}, {
				name: "",
				type: 'area',
				data: []
			}],
			xaxis: {
				type: "month",
				categories: [],
				axisBorder: {
					show: false,
					color: '#e7415a',
				},
                labels: {
					style: {
						colors: '#bababa',
						fontSize: '12px',
					},
				}
			},
			yaxis: {
				labels: {
					style: {
						colors: '#bababa',
						fontSize: '12px',
					},
				}
			},
			fill: {
				gradient: {
				  inverseColors: false,
				  shade: 'dark',
				  type: "vertical",
				  opacityFrom: 0.95,
				  opacityTo: 0.55,
				  stops: [0, 100, 100, 100]
				}
			  },

			tooltip: {
				show:false
			},
			legend: {
				position: "top",
				show:true
			}
		}
	
		chartData.forEach(item => {
			options.series[0].data.push(item[1])
			options.series[1].data.push(item[1])
		})
	
		for (var i=0 ; i <= 500; i++) {
			options.xaxis.categories.push((i + 1))
		}
		
		
		var chart = new ApexCharts(document.querySelector("#chartArea"), options);
		chart.render();
	
	
	
	
		//______Data-Table
		$('#data-table').DataTable({
			language: {
				searchPlaceholder: 'Search...',
				sSearch: '',
			}
		});
		
		//______Select2 
		$('.select2').select2({
			minimumResultsForSearch: Infinity
		});
		
	});	
	 
}
 
let chartData

function renderData(data) {
	// [day - participants count - total entered tokens]
	// chartData = [[1, 2430], [2, 2930], [3, 4530], [4, 8500], [5, 6500]]
	chartData = data
	Object.keys(data).forEach(function(el){
		data[el][1] = (parseInt(data[el][1]) / 1e18).toFixed(2)
		data[el][2] = parseInt(data[el][2])
	})

}





// returns biggest number in the whole array
function arrayMax(arr) {
	return arr.reduce(function (p, v) {
	  	return Math.max.apply(null, ( p > v ? p : v ));
	});
}







//  series: [{
// 	name: "Total Orders",
// 	type: 'line',
// 	data: [0, 45, 30, 75, 15, 94, 40, 115, 30, 105, 65, 110]
	
// },{
// 	name: "Total Sales",
// 	type: 'line',
// 	data: [0, 60, 20, 330, 75, 130, 75, 140, 64, 130, 85, 120]
// }, {
// 	name: "",
// 	type: 'area',
// 	data: [0, 105, 30, 175, 85, 154, 90, 185, 120, 145, 185, 130]
// }],