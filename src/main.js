import Vue from 'vue'
import { Time } from './time.js'
import { Jogo } from './jogo.js'
import _ from 'lodash'

let app = new Vue({
  el: '#app',
  data: {
    colunas: ['#', 'time', 'pontos', 'golsMarcados', 'golsSofridos', 'Saldo'],
    colunasOrdenaveis: ['pontos', 'golsMarcados', 'golsSofridos'],
    parametrosOrdenaveis: {
      chaves: ['pontos', 'golsMarcados', 'golsSofridos'],
      valores: ['desc', 'desc', 'asc']
    },
    timePesquisado: '',
    times: [
      new Time('América-MG', require('./assets/img/escudos/thumb_america-mg.png')),
      new Time('Atlético-MG', require('./assets/img/escudos/thumb_atletico-mg.png')),
      new Time('Atlético-PR', require('./assets/img/escudos/thumb_atletico-pr.png')),
      new Time('Bahia', require('./assets/img/escudos/thumb_bahia.png')),
      new Time('Botafogo', require('./assets/img/escudos/thumb_botafogo-rj.png')),
      new Time('Ceará', require('./assets/img/escudos/thumb_ceara.png')),
      new Time('Chapecoense', require('./assets/img/escudos/thumb_chapecoense.png')),
      new Time('Corinthians', require('./assets/img/escudos/thumb_corinthians.png')),
      new Time('Cruzeiro', require('./assets/img/escudos/thumb_cruzeiro.png')),
      new Time('Flamengo', require('./assets/img/escudos/thumb_flamengo.png')),
      new Time('Fluminense', require('./assets/img/escudos/thumb_fluminense.png')),
      new Time('Grêmio', require('./assets/img/escudos/thumb_gremio.png')),
      new Time('Internacional', require('./assets/img/escudos/thumb_internacional.png')),
      new Time('Palmeiras', require('./assets/img/escudos/thumb_palmeiras.png')),
      new Time('Paraná', require('./assets/img/escudos/thumb_parana.png')),
      new Time('Santos', require('./assets/img/escudos/thumb_santos.png')),
      new Time('São Paulo', require('./assets/img/escudos/thumb_sao_paulo.png')),
      new Time('Sport', require('./assets/img/escudos/thumb_sport.png')),
      new Time('Vasco', require('./assets/img/escudos/thumb_vasco.png')),
      new Time('Vitória', require('./assets/img/escudos/thumb_vitoria.png'))
    ],
    jogo: new Jogo(),
    view: 'tabela'
  },
  created() {
    this.sortearTimes();
  },
  methods: {
    sortearTimes() {
      const TOTAL_TIMES = this.times.length;
      let indiceTimeCasa = Math.floor(Math.random() * TOTAL_TIMES);
      let indiceTimeFora = Math.floor(Math.random() * TOTAL_TIMES);

      while (indiceTimeCasa == indiceTimeFora) {
        indiceTimeCasa = Math.floor(Math.random() * TOTAL_TIMES);
        indiceTimeFora = Math.floor(Math.random() * TOTAL_TIMES);
      }

      this.jogo.timeCasa = this.times[indiceTimeCasa];
      this.jogo.timeFora = this.times[indiceTimeFora];
    },
    finalizarPartida() {
      let timeCasa = this.jogo.timeCasa;
      let timeFora = this.jogo.timeFora;

      timeCasa.golsMarcados += parseInt(this.jogo.golsTimeCasa);
      timeFora.golsMarcados += parseInt(this.jogo.golsTimeFora);
      timeCasa.golsSofridos += parseInt(this.jogo.golsTimeFora);
      timeFora.golsSofridos += parseInt(this.jogo.golsTimeCasa);

      if(this.jogo.golsTimeCasa == this.jogo.golsTimeFora) {
        timeCasa.pontos++;
        timeFora.pontos++;
      }
      else if(this.jogo.golsTimeCasa > this.jogo.golsTimeFora) {
        timeCasa.pontos += 3;
      }
      else if(this.jogo.golsTimeFora > this.jogo.golsTimeCasa) {
        timeFora.pontos += 3;
      }
      // Zerando o placar para o próximo jogo
      this.jogo.golsTimeCasa = 0;
      this.jogo.golsTimeFora = 0;

      this.sortearTimes();
      this.setView('tabela');
    },
    ehOrdenavel(coluna) {
      for (var i = 0; i < this.colunasOrdenaveis.length; i++) {
        if(this.colunasOrdenaveis[i] == coluna) {
          return true;
        }
      }
      return false;
    },
    setView(view) {
      if(view == 'novoJogo') {
        this.sortearTimes();
      }
      this.view = view;
    },
    order(titulo) {
      this.parametrosOrdenaveis.chaves = titulo;
      this.parametrosOrdenaveis.valores = this.parametrosOrdenaveis.valores == 'desc' ? 'asc' : 'desc';
    }
  },
  computed: {
    timesOrdenados() {
      // Lodash orderBy: coleção, chaves e critério
      let times =  _.orderBy(this.times, this.parametrosOrdenaveis.chaves, this.parametrosOrdenaveis.valores);
      // Lodash filter: coleção e regra do filtro - Método da barra de pesquisa
      return _.filter(times, item => {
        return item.nome.toLowerCase().indexOf(this.timePesquisado.toLowerCase()) >= 0;
      });
    }
  },
  filters: {
    saldo(time) {
      return time.golsMarcados - time.golsSofridos;
    },
    capitalizarPrimeiraLetra(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    addSpaceBetweenWordsInCamelCaseFormat(word) {
      // TODO
    }
  }
})
