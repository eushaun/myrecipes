export default function Kitchen() {

  const css=`
  .grid-container {
    display: inline-grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 10px;
    padding: 70px;
    font-family: Arial, Helvetica, sans-serif;
  }

  img {
    max-width: 100%;
  }
  .aligned {

    text-align: justify;
    text-justify: inter-word;
    padding: 20px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .h1{
    font-family: Arial, Helvetica, sans-serif;
  }

  `



  return (
    <div>
      <style>{css}</style>
      <h1 class="text-align"> Kitchen Hygiene</h1>
      <h4 class="text-align">There are some aspects about cooking that you just cannot choose to ignore.
        Having a clean and germ free work surface is just the beginning. This page covers some essentials.</h4>

      <div class="grid-container" id="ingredient-storage">
        <div class="grid-itemr">
          <img src="https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20190503104114/ri/1000/picture/2019/5/By_Tatiana_Volgutov.jpg" alt="Raw-Chicken" width="400" height="200" />
          <h3>Handling Raw Poultry</h3>
          <p class="aligned">Place chicken in a disposable bag before putting in your shopping cart or refrigerator to prevent raw juices from getting onto other foods. Wash hands with warm soapy water for 20 seconds before and after handling chicken. Do not wash raw chicken.</p>
        </div>

        <div class="grid-item">
          <img src="https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/LTX3UMDPTII6VIKWABELMLG3KE.jpg&w=916" alt="Disinfecting" width="400" height="200" />
          <h3>Disinfecting Surfaces</h3>
          <p class="aligned">A general thumb of rule when cleaning surfaces: first rinse and scrub with warm water and soap or detergent to remove any dirt and foreign materials. You can then apply a second disinfectant like alcohol, bleach, hydrogen peroxide, or other compatible disinfection agents that do not damage the surface being cleaned.</p>
        </div>

        <div class="grid-item">
          <img src="https://www.foodqualityandsafety.com/wp-content/uploads/2018/02/HomeSlider_Gloves.jpg" alt="TouchMeNot" width="400" height="200" />
          <h3>Touching Cooked Food</h3>
          <p class="aligned">Never let raw meat, poultry or seafood touch cooked meat or any ready-to-eat foods, as this can cause cross-contamination. Foodborne pathogens from raw meat can easily spread to ready-to-eat foods and cause food poisoning.
            Furthermore, avoid using your hands to touch food that has been cooked as there could be some bacteria on your hands that contaminates the cooked food.
          </p>
        </div>

        <div class="grid-item">
          <img src="https://static.toiimg.com/photo/70295010.cms" alt="WashFruit" width="400" height="200" />
          <h3>Wash your fruit and veg</h3>
          <p class="aligned">Washing fruit and vegetables in vinegar is a good way to remove potential bacteria. Use a solution of three parts water and one part vinegar. Plain water is also effective at removing most bacteria. Vinegar will only remove surface bacteria and not make produce last longer.</p>
        </div>
      </div>


    </div>
  );
};
