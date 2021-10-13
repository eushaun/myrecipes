export default function Storage() {

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
      <h1 class="text-align">Ingredient Storage</h1>
      <h4 class="text-align">Knowing the right way to store ingredients can go along way in preserving your food.
        This page covers some basics.</h4>


      <div class="grid-container" id="ingredient-storage">
        <div class="grid-item">
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/jars-of-ingredients-on-wooden-shelves-royalty-free-image-726774375-1537986726.jpg" alt="Grains" width="400" height="200" />
          <h3>How to store grains</h3>
          <p class="aligned">All whole grains should be stored in airtight containers with tight-ﬁtting lids or closures. The type of container is a matter of preference.
            Glass, plastic, and aluminum canisters or zip-top plastic bags can all be successfully used, as long as they are airtight.</p>
        </div>

        <div class="grid-item">
          <img src="https://www.chatelaine.com/wp-content/uploads/2018/07/expiry-dates-feature-810x445.jpg" alt="Dairy" width="400" height="200" />
          <h3>How to store dairy</h3>
          <p class="aligned">Store milk and other dairy products in the coldest part of the refrigerator.
            Never store milk in the refrigerator door where it is susceptible to warmer air from opening and closing the door.
            Eggs can be stored at room temperature if going to be cooked soon, but refrigerating them significantly increases their shelf life.</p>
        </div>

        <div class="grid-item">
          <img src="https://domf5oio6qrcr.cloudfront.net/medialibrary/10200/GettyImages-1208790371.jpg" alt="FruitnVeg" width="400" height="200" />
          <h3>How to store fruits and veg</h3>
          <p class="aligned">Most fruits and veggies can be stored in the refrigerator.
            A crisper drawer will help protect your produce and keep the moisture in to maintain freshness for longer.
            However, if fruits are raw, they can be left outside to ripen.
          </p>
        </div>

        <div class="grid-item">
          <img src="https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2019/12/CYFF84.jpg" alt="Condiments" width="400" height="200" />
          <h3>How to store condiments</h3>
          <p class="aligned">As a general rule of thumb, sauces containing cream, eggs, milk or other perishables should be refrigerated while others can be left in the cupboard.
            Mayonaisse, Tartare sauce, Aioli, Sour cream dips, etc. must be refrigerated, while sauces like soy sauce, ketchup, barbeque sauce etc and honey,
            maple syrup etc can be left in the cupboard. </p>
        </div>
      </div>



    </div>
  );
};
