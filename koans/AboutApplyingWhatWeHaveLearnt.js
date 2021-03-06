var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];
      var noMushrooms = function(ingredient) {return ingredient !== "mushrooms"}

      /* solve using filter() & all() / any() */
      productsICanEat = _(products).filter(function(product) { return (_(product.ingredients).all(noMushrooms) && !product.containsNuts)})

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.chain(_.range(0, 1000, 1))
              .reduce(function(sum, x) {return x % 3 === 0 || x % 5 === 0 ? sum + x : sum})
              .value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    ingredientCount = _.chain(products)
        .map(function(product) { return product.ingredients })
        .flatten()
        .countBy(function(ingredient) {return ingredient})
        .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {
    var largestPrimeFactor = function(num) {
      let i = 2
      while (i <= Math.sqrt(num)) {
        if (num % i === 0) {
          num /= i;
        } else { 
          i += i === 2 ? 1 : 2;
        }
      }
      return num
    }

    expect(largestPrimeFactor(212)).toBe(53);
    expect(largestPrimeFactor(395)).toBe(79);
    expect(largestPrimeFactor(4532167465)).toBe(2755117);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    let largestPalindrome = 0;
    var isPalindrome = function(num) {
      return num.toString() === num.toString().split("").reverse().join("");
    }
    let lowerLimit = 0;
    let upperLimit = 999;
    for (let x = upperLimit; x > lowerLimit; x--) {
      for (let y = upperLimit; y > lowerLimit; y--) {
        if (isPalindrome(x * y)) {
          largestPalindrome = x * y;
          lowerLimit = y;
          upperLimit = x;
        }
      }
    }

    expect(largestPalindrome).toBe(888888);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var factors = {};
    // !! Find out how to prevent enumeration on prototyped properties !!
    Object.defineProperty(factors, "beget", {enumerable: false})
    for (let num = 2; num <= 20; num++) {
      let i = 2;
      let count = 0
      let numCopy = num
      while (i <= numCopy) {
        if (numCopy % i === 0) {
          count++
          factors[i] = factors[i] && factors[i] > count ? factors[i] : count;
          numCopy /= i;
        } else {
          count = 0
          i += i === 2 ? 1 : 2;
        }
      }
    }
    var scd = 1;
    for (let factor in factors) {
      scd *= factor ** factors[factor];
    }

    expect(scd).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var differenceOfSumSquare = function (n) {
      return Math.abs((3*n**2 + 2*n) * (1 - n**2) / 12);
    }
    expect(differenceOfSumSquare(4)).toBe(70);
    expect(differenceOfSumSquare(10)).toBe(2640);
    expect(differenceOfSumSquare(95)).toBe(20503280);
  });

  it("should find the 10001st prime", function () {
    var max = 1000005;

    var makePrimesList = function(max) {
      var isPrime = _.map(_.range(max), x => x = true);
      var foundPrimes = []
      for (let i = 2; i < max; i++) {
        if (isPrime[i] == true) {
          foundPrimes.push(i);
          for (let x = i * i; x <  max; x += i) {
            isPrime[x] = false;
          }
        }
      }
      return foundPrimes;
    }
    expect(makePrimesList(max)[10000]).toBe(104743);
  });
});
