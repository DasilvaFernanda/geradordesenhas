// aqui eu deixei a lógica.
document.addEventListener("DOMContentLoaded", () => {
  
  const lenRange  = document.getElementById("length");
  const lenOut    = document.getElementById("lenOut");
  const lowerEl   = document.getElementById("lower");
  const upperEl   = document.getElementById("upper");
  const numsEl    = document.getElementById("nums");
  const symsEl    = document.getElementById("syms");

  const genBtn    = document.getElementById("genBtn");
  const copyBtn   = document.getElementById("copyBtn");

  const pwdBox    = document.getElementById("pwdBox");
  const pwdSpan   = document.getElementById("password");

 
  const LOWER = "abcdefghijklmnopqrstuvwxyz";
  const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const NUMS  = "0123456789";
  const SYMS  = "!@#$%&*+-_=?.:,;()[]{}";

  
  const updateLenOut = () => (lenOut.textContent = lenRange.value);
  updateLenOut();
  lenRange.addEventListener("input", updateLenOut);

  
  const randOf = (str) => str[Math.floor(Math.random() * str.length)];
  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  function generatePassword(len, opts) {
    const pools = [];
    if (opts.lower) pools.push(LOWER);
    if (opts.upper) pools.push(UPPER);
    if (opts.nums)  pools.push(NUMS);
    if (opts.syms)  pools.push(SYMS);

    if (pools.length === 0) return "";

    const required = [];
    pools.forEach(pool => required.push(randOf(pool)));

    const all = pools.join("");
    const restLen = Math.max(0, len - required.length);
    for (let i = 0; i < restLen; i++) required.push(randOf(all));

    return shuffle(required).join("");
  }

  function setPassword(pwd) {
    pwdSpan.textContent = pwd || "Clique em Gerar";
  }

  genBtn.addEventListener("click", () => {
    const len = parseInt(lenRange.value, 10);
    const options = {
      lower: lowerEl.checked,
      upper: upperEl.checked,
      nums:  numsEl.checked,
      syms:  symsEl.checked,
    };

    const pwd = generatePassword(len, options);
    if (!pwd) {
      setPassword("Selecione pelo menos 1 opção");
      return;
    }
    setPassword(pwd);
  });

  
  copyBtn.addEventListener("click", copyPassword);
  pwdBox.addEventListener("click", copyPassword);

  function copyPassword() {
    const pwd = pwdSpan.textContent.trim();
    if (!pwd || pwd === "Clique em Gerar" || pwd === "Selecione pelo menos 1 opção") return;

    navigator.clipboard.writeText(pwd).then(() => {
      
      pwdBox.classList.add("blink");
      setTimeout(() => pwdBox.classList.remove("blink"), 1200);

     
      const prev = copyBtn.textContent;
      copyBtn.textContent = "Copiado!";
      copyBtn.disabled = true;
      setTimeout(() => {
        copyBtn.textContent = prev;
        copyBtn.disabled = false;
      }, 900);
    });
  }
});
