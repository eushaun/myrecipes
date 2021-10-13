export default function Knife() {
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
      <h1 class="text-align">Knife Skills</h1>
      <h4 class="text-align"> Having good basic knife skills will significantly reduce your prep times and learning how to do it the right way will reduce your risk of getting hurt.<br/>
        This page will talk you through some essentials to get started. It will also cover some tips to elevate your cooking.</h4>

      <div class="grid-container" id="ingredient-storage">



        <div class="grid-item">
          <img src="https://cdn.shopify.com/s/files/1/0445/1365/6985/articles/types-of-kitchen-knives_1728x.jpg?v=1617738802" alt="Knives" width="350" height="200" />
          <h3>Types of Knives</h3>
          <p class="aligned">While the selection of knives is quite diverse and often confusing, for most everyday cooking purposes, you will only need a chef's knife,
            a paring knife and a bread knife. A chef's knife is the most versatile of the lot and if you had to pick only one, it should be this one.</p>
        </div>

        <div class="grid-item">
          <img src="https://www.nomoretogo.com/wp-content/uploads/2013/06/chop-dice-mince.jpg" alt="Chops" width="350" height="200" />
          <h3>Chop-Dice-Mince</h3>
          <p class="aligned">Sometimes the words chop and dice are used interchangeably, but technically the word dice is used for smaller pieces and the word chop is used for larger pieces.
            The word mince means a very small dice. As a general rule, first slice the vegetable or allium length wise, then make a cut through the vertical center,
            then turn it 90 degrees and begin cutting horizontally.
          </p>
        </div>

        <div class="grid-item">
          <img src="https://allaboutkitchenknives.com/staging/3478/wp-content/uploads/2017/08/shutterstock_631441214.jpg" alt="Julienne" width="350" height="200" />
          <h3>The Julienne Cut</h3>
          <p class="aligned">In the julienne (or French) cut, the ingredient is cut into long, uniform strips like matchsticks. Julienne cut is often used for salad ingredients and green veggies, like cucumbers, bell peppers, and zucchini.
            After cutting the vegetable into an appropriate size, merely hold the vegetable saefly, and cut it in short sharp strokes along it's length.
          </p>
        </div>

        <div class="grid-item">
          <img src="https://res.cloudinary.com/hksqkdlah/image/upload/c_fill,dpr_2.0,e_sharpen:50,f_auto,fl_lossy,g_faces,q_35,w_995/28985_stp-makeitsharp-20" alt="Sharpen" width="350" height="200" />
          <h3>Knife Sharpening</h3>
          <p class="aligned">A blunt knife can significantly increase the risk of getting hurt and increase prep times as well.
            There are many complicated methods to sharpen a knife, but for a beginner, the best method is to use a handheled knife sharpener which is easily available. </p>

        </div>

      </div>
    </div>
  );
};
