import Vue from 'vue'
import { Time } from './time.js'
import { Jogo } from './jogo.js'

let app = new Vue({
  el: '#app',
  data: {
    colunas: ['#', 'time', 'pontos', 'gm', 'gs', 'Saldo'],
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
    finalizarPartida(timeCasa, timeFora) {
      if(timeCasa.golsMarcados == timeFora.golsMarcados) {
        timeCasa.pontos++;
        timeFora.pontos++;
        timeCasa.golsSofridos += parseInt(timeFora.golsMarcados);
        timeFora.golsSofridos += parseInt(timeCasa.golsMarcados);
      }
      else if(timeCasa.golsMarcados > timeFora.golsMarcados) {
        timeCasa.pontos += 3;
        timeCasa.golsSofridos += parseInt(timeFora.golsMarcados);
        timeFora.golsSofridos += parseInt(timeCasa.golsMarcados);
      }
      else if(timeFora.golsMarcados > timeCasa.golsMarcados) {
        timeFora.pontos += 3;
        timeCasa.golsSofridos += parseInt(timeFora.golsMarcados);
        timeFora.golsSofridos += parseInt(timeCasa.golsMarcados);
      }
      this.sortearTimes();
      this.setView('tabela');
    },
    setView(view) {
      this.view = view;
    }
  },
  filters: {
    saldo(time) {
      return time.golsMarcados - time.golsSofridos;
    },
    capitalizarPrimeiraLetra(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
})
