document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     CONFIGURAÇÃO DO CONVITE — EDITE SÓ ESTE BLOCO
     ========================================================= */

  const convite = {

    nome: "Joaquim",

    idade: 1,

    mensagemAbertura:
      "Você acaba de receber um convite especial!",

    mensagemInterna:
      "Hakuna Matata! Todo o reino te espera para comemorar esse dia especial! 🦁",

    dataExibicao: "15 de Novembro",

    horaExibicao: "15:00",

    local: "Sítio Munay",

   endereco: "Estrada Passo do Morrinho, 2000 — Porto Alegre/RS",


    // IMPORTANTE:
    // troque pela data REAL da festa.
    // Exemplo:
    // 2027-03-15T16:00:00-03:00

    dataEventoISO: "2026-11-15T15:00:00-03:00",


    // WHATSAPP
    // Somente números:
    // 55 + DDD + número

    whatsappNumero: "5551981166497",

    whatsappMensagem:
      "Oi! 💛 Vim pelo convite do Joaquim 🦁✨ Quero confirmar minha presença no aniversário de 1 aninho dele! 🎉\n\nNome: \nQuantidade de pessoas: ",


    // GOOGLE MAPS
    // Se tiver um link pronto, coloque em mapsLink.
    // Caso contrário, o endereço de mapsQuery será pesquisado.

    mapsLink: "",

    mapsQuery: "Estrada Passo do Morrinho 2000, Porto Alegre, RS",

    // ÁLBUM
    // Quando tiver um álbum, cole o link.
    // Vazio = mostra "Em breve".

    albumLink: "",


    // TRILHA SONORA

    musicaVolume: 0.22,

    musicaFadeMs: 1900

  };


  /* =========================================================
     ELEMENTOS DA PÁGINA
     ========================================================= */

  const $ = (id) => document.getElementById(id);

  const el = {

    txtNome: $("txtNome"),

    txtIdade: $("txtIdade"),

    txtMensagemAbertura: $("txtMensagemAbertura"),

    txtMensagemInterna: $("txtMensagemInterna"),

    txtData: $("txtData"),

    txtHora: $("txtHora"),

    txtLocal: $("txtLocal"),

    txtEndereco: $("txtEndereco"),

    btnAbrir: $("btnAbrir"),

    envelope: $("envelope"),

    stageEnvelope: $("stageEnvelope"),

    stageContent: $("stageContent"),

    btnRsvp: $("btnRsvp"),

    btnMaps: $("btnMaps"),

    btnPresentes: $("btnPresentes"),

    btnAlbum: $("btnAlbum"),

    modal: $("modalPresentes"),

    heroVideo: $("heroVideo"),

    heroFallback: $("heroFallback"),

    countdownText: $("countdownText"),

    countDays: $("countDays"),

    countHours: $("countHours"),

    countMinutes: $("countMinutes"),

    countSeconds: $("countSeconds"),

    celebration: $("celebration"),

    bgMusic: $("bgMusic"),

    musicControl: $("musicControl"),

    musicStatus: $("musicStatus")

  };


  /* =========================================================
     FUNÇÕES AUXILIARES
     ========================================================= */

  const setText = (node, value) => {
    if (node) {
      node.textContent = value;
    }
  };


  const openExternal = (url) => {
    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };


  /* =========================================================
     APLICAR DADOS DO CONVITE
     ========================================================= */

  function aplicarDados() {

    setText(
      el.txtNome,
      convite.nome
    );

    setText(
      el.txtIdade,
      convite.idade
    );

    setText(
      el.txtMensagemAbertura,
      convite.mensagemAbertura
    );

    setText(
      el.txtMensagemInterna,
      convite.mensagemInterna
    );

    setText(
      el.txtData,
      convite.dataExibicao
    );

    setText(
      el.txtHora,
      convite.horaExibicao
    );

    setText(
      el.txtLocal,
      convite.local
    );

    setText(
      el.txtEndereco,
      convite.endereco
    );

  }


  /* =========================================================
     VÍDEO DO TOPO
     ========================================================= */

  function configurarVideo() {

    if (!el.heroVideo) {
      return;
    }


    const fallbackTimer = setTimeout(() => {

      if (el.heroVideo.readyState < 2) {

        el.heroFallback?.classList.add(
          "is-visible"
        );

      }

    }, 2500);


    el.heroVideo.addEventListener(
      "loadeddata",
      () => {

        clearTimeout(
          fallbackTimer
        );

        el.heroFallback?.classList.remove(
          "is-visible"
        );

      }
    );


    el.heroVideo.addEventListener(
      "error",
      () => {

        el.heroFallback?.classList.add(
          "is-visible"
        );

      }
    );


    el.heroVideo
      .play()
      .catch(() => {});

  }


  /* =========================================================
     TRILHA SONORA
     ========================================================= */

  let musicFadeFrame = null;


  function atualizarControleMusica(estado) {

    if (!el.musicControl) {
      return;
    }


    const tocando =
      estado === "playing";


    el.musicControl.classList.toggle(
      "is-playing",
      tocando
    );


    el.musicControl.classList.toggle(
      "is-ended",
      estado === "ended"
    );


    el.musicControl.setAttribute(
      "aria-pressed",
      String(tocando)
    );


    if (estado === "playing") {

      el.musicControl.setAttribute(
        "aria-label",
        "Pausar trilha da savana"
      );

      setText(
        el.musicStatus,
        "Rádio Leãozinho"
      );

    }

    else if (estado === "ended") {

      el.musicControl.setAttribute(
        "aria-label",
        "Tocar trilha da savana novamente"
      );

      setText(
        el.musicStatus,
        "tocar novamente"
      );

    }

    else if (estado === "blocked") {

      el.musicControl.setAttribute(
        "aria-label",
        "Tocar trilha da savana"
      );

      setText(
        el.musicStatus,
        "toque para tocar"
      );

    }

    else {

      el.musicControl.setAttribute(
        "aria-label",
        "Continuar trilha da savana"
      );

      setText(
        el.musicStatus,
        "pausada"
      );

    }

  }


  function fadeMusica(
    ate,
    duracao = 700,
    aoTerminar
  ) {

    if (!el.bgMusic) {
      return;
    }


    if (musicFadeFrame) {

      cancelAnimationFrame(
        musicFadeFrame
      );

    }


    const inicio =
      performance.now();


    const de =
      el.bgMusic.volume;


    const destino =
      Math.min(
        1,
        Math.max(
          0,
          ate
        )
      );


    const passo = (agora) => {

      const progresso =
        Math.min(
          1,
          (agora - inicio) / duracao
        );


      // Fade suave

      const suave =
        1 -
        Math.pow(
          1 - progresso,
          3
        );


      el.bgMusic.volume =
        de +
        (destino - de) *
        suave;


      if (progresso < 1) {

        musicFadeFrame =
          requestAnimationFrame(
            passo
          );

      }

      else {

        musicFadeFrame = null;

        aoTerminar?.();

      }

    };


    musicFadeFrame =
      requestAnimationFrame(
        passo
      );

  }


  function tocarMusica({
    reiniciar = false
  } = {}) {

    if (!el.bgMusic) {
      return;
    }


    if (
      reiniciar ||
      el.bgMusic.ended
    ) {

      el.bgMusic.currentTime = 0;

    }


    if (musicFadeFrame) {

      cancelAnimationFrame(
        musicFadeFrame
      );

    }


    el.bgMusic.volume =
      Math.min(
        el.bgMusic.volume || 0.01,
        0.04
      );


    const tentativa =
      el.bgMusic.play();


    if (
      tentativa &&
      typeof tentativa.then === "function"
    ) {

      tentativa
        .then(() => {

          atualizarControleMusica(
            "playing"
          );

          fadeMusica(
            convite.musicaVolume,
            convite.musicaFadeMs
          );

        })

        .catch(() => {

          atualizarControleMusica(
            "blocked"
          );

        });

    }

    else {

      atualizarControleMusica(
        "playing"
      );

      fadeMusica(
        convite.musicaVolume,
        convite.musicaFadeMs
      );

    }

  }


  function iniciarMusicaAoAbrir() {

    if (
      !el.bgMusic ||
      !el.musicControl
    ) {

      return;

    }


    el.musicControl.classList.remove(
      "is-hidden"
    );


    // O play acontece dentro do clique
    // para funcionar corretamente no celular.

    el.bgMusic.volume = 0.01;

    tocarMusica();

  }


  function configurarMusica() {

    if (
      !el.bgMusic ||
      !el.musicControl
    ) {

      return;

    }


    el.bgMusic.loop = false;

    el.bgMusic.volume = 0.01;


    el.musicControl.addEventListener(
      "click",
      () => {

        if (
          el.bgMusic.paused ||
          el.bgMusic.ended
        ) {

          tocarMusica({
            reiniciar:
              el.bgMusic.ended
          });

          return;

        }


        atualizarControleMusica(
          "paused"
        );


        fadeMusica(
          0,
          320,
          () => el.bgMusic?.pause()
        );

      }
    );


    el.bgMusic.addEventListener(
      "ended",
      () => {

        atualizarControleMusica(
          "ended"
        );

      }
    );

  }


  /* =========================================================
     CELEBRAÇÃO AO ABRIR
     ========================================================= */

  function soltarCelebracao() {

    if (
      !el.celebration ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {

      return;

    }


    el.celebration.replaceChildren();


    const total = 22;


    for (
      let i = 0;
      i < total;
      i += 1
    ) {

      const p =
        document.createElement(
          "span"
        );


      const r =
        (360 / total) * i +
        Math.random() * 10;


      const d =
        95 +
        Math.random() * 125;


      p.style.setProperty(
        "--r",
        `${r}deg`
      );


      p.style.setProperty(
        "--d",
        `${d}px`
      );


      p.style.animationDelay =
        `${Math.random() * 0.08}s`;


      el.celebration.appendChild(
        p
      );

    }


    setTimeout(
      () =>
        el.celebration?.replaceChildren(),
      1200
    );

  }


  /* =========================================================
     ENVELOPE
     ========================================================= */

  function configurarEnvelope() {

    let aberto = false;


    if (
      !el.btnAbrir ||
      !el.envelope ||
      !el.stageEnvelope ||
      !el.stageContent
    ) {

      return;

    }


    el.btnAbrir.addEventListener(
      "click",
      () => {

        if (aberto) {
          return;
        }


        aberto = true;

        el.btnAbrir.disabled = true;


        // O clique também libera
        // a trilha sonora no celular.

        iniciarMusicaAoAbrir();


        el.envelope.classList.add(
          "is-flap-open"
        );


        navigator.vibrate?.(25);


        setTimeout(
          () =>
            el.envelope.classList.add(
              "is-letter-out"
            ),
          260
        );


        setTimeout(
          soltarCelebracao,
          590
        );


        setTimeout(
          () => {

            el.stageEnvelope.classList.add(
              "hidden"
            );


            el.stageContent.classList.remove(
              "hidden"
            );


            el.stageContent.classList.add(
              "is-visible"
            );


            el.stageContent.scrollIntoView({
              behavior: "smooth",
              block: "nearest"
            });

          },
          1120
        );

      }
    );

  }


  /* =========================================================
     WHATSAPP — CONFIRMAÇÃO DE PRESENÇA
     ========================================================= */

  function configurarWhatsapp() {

    if (!el.btnRsvp) {
      return;
    }


    el.btnRsvp.addEventListener(
      "click",
      () => {

        const numero =
          (
            convite.whatsappNumero ||
            ""
          ).replace(
            /\D/g,
            ""
          );


        if (
          !numero ||
          numero ===
            "5511999999999"
        ) {

          alert(
            "Antes de publicar, coloque o WhatsApp real no início do script.js."
          );

          return;

        }


        const texto =
          encodeURIComponent(
            convite.whatsappMensagem ||
            "Confirmando presença!"
          );


        const url =
          `https://wa.me/${numero}?text=${texto}`;


        openExternal(
          url
        );

      }
    );

  }


  /* =========================================================
     GOOGLE MAPS
     ========================================================= */

  function configurarMaps() {

    el.btnMaps?.addEventListener(
      "click",
      () => {

        let url =
          (
            convite.mapsLink ||
            ""
          ).trim();


        if (!url) {

          const queryBase =
            (
              convite.mapsQuery ||
              convite.endereco ||
              ""
            ).trim();


          if (
            !queryBase ||
            queryBase.includes(
              "Exemplo"
            )
          ) {

            alert(
              "Antes de publicar, tenho que colocar o endereço real no início do script.js."
            );

            return;

          }


          url =
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              queryBase
            )}`;

        }


        openExternal(
          url
        );

      }
    );

  }


  /* =========================================================
     SUGESTÕES DE PRESENTES
     ========================================================= */

  function configurarPresentes() {

    if (!el.modal) {
      return;
    }


    const abrir = () => {

      el.modal.classList.remove(
        "hidden"
      );


      document.body.classList.add(
        "modal-open"
      );


      el.modal
        .querySelector(
          ".modal__close"
        )
        ?.focus();

    };


    const fechar = () => {

      el.modal.classList.add(
        "hidden"
      );


      document.body.classList.remove(
        "modal-open"
      );


      el.btnPresentes?.focus();

    };


    el.btnPresentes?.addEventListener(
      "click",
      abrir
    );


    el.modal.addEventListener(
      "click",
      (event) => {

        const target =
          event.target;


        if (
          target instanceof HTMLElement &&
          target.dataset.close ===
            "true"
        ) {

          fechar();

        }

      }
    );


    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape" &&
          !el.modal.classList.contains(
            "hidden"
          )
        ) {

          fechar();

        }

      }
    );

  }


  /* =========================================================
     ÁLBUM DA FESTA
     ========================================================= */

  function configurarAlbum() {

    if (!el.btnAlbum) {
      return;
    }


    if (!convite.albumLink) {

      el.btnAlbum
        .querySelector("small")
        ?.replaceChildren(
          document.createTextNode(
            "em breve • memórias do grande dia"
          )
        );


      el.btnAlbum.addEventListener(
        "click",
        () => {

          alert(
            "O álbum estará disponível depois da festa 📸💛"
          );

        }
      );


      return;

    }


    el.btnAlbum.addEventListener(
      "click",
      () =>
        openExternal(
          convite.albumLink
        )
    );

  }


  /* =========================================================
     CONTAGEM REGRESSIVA
     ========================================================= */

  function preencherContagem(diff) {

    const total =
      Math.max(
        0,
        Math.floor(
          diff / 1000
        )
      );


    const dias =
      Math.floor(
        total / 86400
      );


    const horas =
      Math.floor(
        (total % 86400) /
        3600
      );


    const minutos =
      Math.floor(
        (total % 3600) /
        60
      );


    const segundos =
      total % 60;


    setText(
      el.countDays,
      String(dias).padStart(
        2,
        "0"
      )
    );


    setText(
      el.countHours,
      String(horas).padStart(
        2,
        "0"
      )
    );


    setText(
      el.countMinutes,
      String(minutos).padStart(
        2,
        "0"
      )
    );


    setText(
      el.countSeconds,
      String(segundos).padStart(
        2,
        "0"
      )
    );

  }


  function configurarContagem() {

    const dataEvento =
      new Date(
        convite.dataEventoISO
      );


    if (
      Number.isNaN(
        dataEvento.getTime()
      )
    ) {

      setText(
        el.countdownText,
        "Atualizar a data da festa no script.js."
      );

      return;

    }


    const atualizar = () => {

      const diff =
        dataEvento.getTime() -
        Date.now();


      preencherContagem(
        diff
      );


      if (diff <= 0) {

        setText(
          el.countdownText,
          "A festa já começou / ou a data precisa ser atualizada. 🦁💛"
        );

      }

      else {

        setText(
          el.countdownText,
          "Cada segundo deixa a aventura mais pertinho."
        );

      }

    };


    atualizar();


    setInterval(
      atualizar,
      1000
    );

  }


  /* =========================================================
     INICIAR O CONVITE
     ========================================================= */

  aplicarDados();

  configurarVideo();

  configurarMusica();

  configurarEnvelope();

  configurarWhatsapp();

  configurarMaps();

  configurarPresentes();

  configurarAlbum();

  configurarContagem();

}
);

