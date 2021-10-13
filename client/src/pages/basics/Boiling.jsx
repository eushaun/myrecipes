export default function Boiling() {

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
      <div>
        <style>{css}</style>
        <h1 class="text-align">Boiling Tips</h1>
        <h4 class="text-align">Boiling is one of the most elementary, yet fundamental skills a beginner to cooking needs to perfect.
          It is  very versatile and the techniques learnt have a lot of carry over.<br/> Whether it's rice, potatoes, pasta, chicken or veggies, this page has you covered.</h4>

        <div class="grid-container" id="ingredient-storage">
          <div class="grid-item">
            <img src="https://assets.epicurious.com/photos/5c34e5f23afb9d2d62ce40ee/16:9/w_2240,c_limit/SUNDAY-STASH-JANUARY-Rice-process-04012019-copy.jpg" alt="Rice" width="400" height="200" />
            <h3>Cooking Rice</h3>
            <p class="aligned" > The basic water to white rice ratio is 2 cups water to 1 cup rice.
              You can easily, double and even triple the recipe; just make sure you are using a pot large enough to hold the rice as it cooks and expands.
              Simply add the rice to cold water and allow it to boil on medium-high heat till it reaches the desired donneness. You can tell it's cooked when
              you bite into the center and the grains are soft. </p>
          </div>

          <div class="grid-item">
            <img src="https://www.womansworld.com/wp-content/uploads/2020/09/save-potato-water.jpg" alt="Potatoes" width="400" height="200" />
            <h3>Boiling Potatoes</h3>
            <p class="aligned" >Since potatoes are dense, there is a simple but specific technique to getting them done just right. Simply add the potatoes to cold water
              and bring to boil on high heat. Once the water is boiling, reduce the heat to a simmer and cook for another 10 minutes.
              This will ensure perfectly done, evenly cooked potatoes every time. </p>
          </div>

          <div class="grid-item">
            <img src="https://static.oprah.com/2017/01/201701-orig-al-dente-pasta-949x534.jpg" alt="Pasta" width="400" height="200" />
            <h3>Cooking Pasta</h3>
            <p class="aligned">Since pasta is a delicate ingredient, it cooks quickly and we must ensure we get it right. First, bring the water to a rolling boil, or an agressive boil, then salt the water heavily, and then add the pasta.
              After cooking for 10 minutes, bite into a piece of the pasta. If it is nearly done but has a little bite to it, turn the heat off and drain the water. </p>
          </div>

          <div class="grid-item">
            <img src="https://www.createkidsclub.com/wp-content/uploads/2020/12/how-to-boil-chicken-breasts-6-2048x1365.jpg" alt="Chicken" width="400" height="200" />
            <h3>Boiling Chicken</h3>
            <p class="aligned">Boiling chicken is one of the most simple methods of preparation of chicken. Simply add chicken to cold water, and bring it to a boil, continue to boil it till the chicken reaches an internal temperature of 165 C, or until the meat is completely white.
              You could also choose to add salt, and aromatics like ginger, garlic corriander etc to the pot, for some extra flavour.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
