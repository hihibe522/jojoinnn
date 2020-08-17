<script>
import { Radar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    mixins: [reactiveProp],
    extends: Radar,
    // props:["max_data"],
    data() {
        return {
            options : {
                // max:this.max_data,
                scale: {
                    angleLines: {
                        display: true,
                        color: "#DFDFDF"
                    },
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax:70,
                        display: false,
                    },
                    gridLines: {
                        lineWidth: [1, 1, 1, 1, 1, 3],
                        color: ["#DFDFDF", "#DFDFDF", "#DFDFDF", "#DFDFDF", "#DFDFDF", "#919497"],
                        circular: true,
                        offsetGridLines: true
                    },

                    // 頂點文字
                    pointLabels: {
                        fontColor: "#919497",
                        fontSize: 16,
                        fontFamily: 'cwTeXYen'
                    },
                },     
            },
        }
    },
    mounted() {
        this.renderRadarChart();
    },
    methods: {
        renderRadarChart() {
            this.renderChart(this.chartData, this.options);
        }
  }





}
</script>