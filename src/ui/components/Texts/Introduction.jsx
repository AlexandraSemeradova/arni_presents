import { PrimaryLink } from "../Links/Links";

const Introduction = () => {
  return (
    <section className="u-mb-2 u-p-1_5 u-xl-rounded u-bcg-white">
        <div className="u-mb-0_5">
          <p>Milá rodina a kamoši, <span className="u-bold">25. júl 2026</span> sa blíži a veľmi sa na vás tešíme 🎉🥳!</p>
        </div>

        <div className="u-mb-0_5">
          <p>Keďže nejde o svadbu 💒❌, prosím nič nenoste. Ja a Milanko máme jeden druhého ❤️‍🔥.</p>
        </div>

        <div className="u-mb-0_5">
          <p>Ak však nechcete prísť s prázdnymi rukami 👐🎁, pripravila som zoznam vecí, ktoré Arni ešte nemá a určite ho potešia.</p>
          <p>Vyberte si darček cez tlačidlo <span className="u-bold">Vybrať</span>, aby sme <span className="u-bold">predišli duplicitám</span> 🔖.</p>
        </div>

        <div className="u-mb-0_5">
          <p>Ak vám nič nesadne, darčekové karty z <PrimaryLink  link="https://www.mojadm.sk/services/sluzby-v-dm-predajniach/dm-darcekove-karty-371624#online"  text="dm-ky" /> alebo <PrimaryLink  link="https://www2.hm.com/sk_sk/customer-service/gift-card.html?srsltid=AfmBOoo0P3J9uxPF0Hpcyj_UmN1ifu-f1pclY4QHbijgsJx9oAZJBWAN"  text="H&M" /> vždy potešia.</p>
        </div>
    </section>
  );
}

export default Introduction;
