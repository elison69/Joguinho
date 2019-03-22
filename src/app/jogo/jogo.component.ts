import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { style, keyframes } from '@angular/core/src/animation/dsl';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { createUrlResolverWithoutPackagePrefix, DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';
import { asTextData } from '@angular/core/src/view';

var i = 0;
var idNave = 0;
const todasNavesInimigas = [];
@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})

export class JogoComponent implements OnInit {
  
  constructor() { }
  ngOnInit() {
    const naveP =  document.getElementById("nave");
    const largura = ($(window).width() /2) -43;
    naveP.style.left = largura +"px";
    
    $(window).ready(() => {
      // Criar aliens inimigos com posições aleatorias
      const id = setInterval(function(){
        const posNavL =  Math.floor(Math.random() * $(window).width()-30);
        const tipNav =  Math.floor(Math.random() * 4);
        const ePai = document.getElementById("jogo");
        const naveInimiga = document.createElement("div");
        ePai.appendChild(naveInimiga);
        naveInimiga.id = "naveIni"+idNave;
        todasNavesInimigas.push(idNave);
        naveInimiga.style.position = "absolute";
        switch (tipNav) {
          case 0:
            naveInimiga.style.backgroundImage = "url(../../assets/alien1.png)";
            break;
          case 1:
            naveInimiga.style.backgroundImage = "url(../../assets/alien2.png)";
            break;
          case 2:
            naveInimiga.style.backgroundImage = "url(../../assets/alien3.png)";
            break;
          case 3:
            naveInimiga.style.backgroundImage = "url(../../assets/alien4.png)";
            break;
        }
        naveInimiga.style.height = "96px";
        naveInimiga.style.width = "96px";
        naveInimiga.style.top = 0+"px";
        naveInimiga.style.left = posNavL +"px";
        var naveIni = $("#naveIni"+idNave).position().top;
        console.log("-------------------------------------------------");
        
        for (let a = 0; a < todasNavesInimigas.length; a++) {
          console.log(todasNavesInimigas[a]);
        }
        const ida = setInterval(function(){
          if (naveIni > $(window).height()) {
            clearInterval(ida);
            let indexDelet = todasNavesInimigas.indexOf(idNave);
            todasNavesInimigas.splice(indexDelet,1)
            naveInimiga.remove();
          }else{
            naveIni = naveIni + 30;
            naveInimiga.style.top = naveIni + "px";
          }
        },300);
        idNave++;
      },5000);
      $(window).keydown(function(e){
       
        // left
        if(e.which == 37 || e.keyCode == 37){
          var nave = document.getElementById("nave")
          var posL = $("#nave").position().left;
          if (posL > 30) {
            posL = posL -30;
            nave.style.left = posL + "px";
          }
        }
        // right
        if (e.which == 39 || e.keyCode == 39) {
          var nave = document.getElementById("nave")
          var posL = $("#nave").position().left;
          if (posL < $(window).width()-96) {
            posL = posL + 30;
            nave.style.left = posL + "px";
          }
        }
        // top
        if (e.which == 38 || e.keyCode == 38) {
          var nave = document.getElementById("nave")
          var posT = $("#nave").position().top;
          if (posT > 30) {
            posT = posT - 30;
            nave.style.top = posT + "px";
          }
        }
        // back
        if (e.which == 40 || e.keyCode == 40) {
          var nave = document.getElementById("nave")
          var posT = $("#nave").position().top;
          if (posT < $(window).height()-96) {
            posT = posT + 30;
            nave.style.top = posT + "px";
          }
        }
        if (e.which == 32 || e.keyCode == 32) {
          var div = document.createElement('div');
          div.setAttribute("id","tiro")
        }
        //tiro
        if(e.which == 32 || e.keyCode == 32){
          i++ 
          var posL = $("#nave").position().left;
          var posT = $("#nave").position().top;
          var nave = document.getElementById("nave");
          var ePai = document.getElementById("jogo");
          let tiro = this.document.createElement("div");
          ePai.appendChild(tiro);
          tiro.id = "tiro"+i;
          tiro.style.position = "absolute";
          tiro.style.backgroundColor = "yellow";
          tiro.style.height = "30px";
          tiro.style.width = "7px";
          tiro.style.top = posT -25+"px";
          tiro.style.left = posL +44+"px";
          var tiroT = $("#tiro"+i).position().top;
          var id = setInterval(function(){
            if (tiroT < 0) {
              clearInterval(id);
              tiro.remove();
            }else{
              tiroT = tiroT - 30;
              tiro.style.top = tiroT + "px";
              
              for (var index = 0; index < todasNavesInimigas.length; index++) {
                const id = todasNavesInimigas[index];
                if ($("#naveIni"+id) && $("#naveIni"+id).position() && posL +44 > $("#naveIni"+id).position().left && posL +44 < $("#naveIni"+id).position().left +96) {
                  index = todasNavesInimigas.length;
                  tiro.style.backgroundColor = "red";
                }
              }
            }
          },50);
        }
      })
    });  
  }
}


