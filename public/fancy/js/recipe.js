var recipeApp = angular.module("recipeApp", ['ui.bootstrap']);

recipeApp.controller("recipeCtrl", function($scope) {
	var rs = [{
		  "name":"Wilted leaf lettuce - sue conrad",
	  "categories":["Salads"],
	  "yield":6,
	  "ingredients":[
	    {"section":"Ingredients", "ingredients":[{"qty":"6", "unit":"ea","name":"slices bacon"},{"qty":"1/2", "unit":"c","name":"sliced green onion"},{"qty":"1/4", "unit":"c","name":"vinegar"},{"qty":"4", "unit":"ts","name":"sugar"},{"qty":"8", "unit":"c","name":"leaf lettuce torn bite sizes"},{"qty":"6", "unit":"ea","name":"radishes, thinly sliced"},{"qty":"1", "unit":"ea","name":"hard-cooked egg, chopped"}]}
  ],
	  "instructions":"Cook bacon till crisp; drain and crumble, reserving drippings.  Addonion to drippings; cook till tender.  Add vinegar, 1/4 cup water,sugar, 1/2 teaspoon salt, and bacon; cook and stir till boiling.Place lettuce in bowl; pour hot dressing over; toss to coat.  Garnishwith radishes and egg.  Serveral generous twists of a pepper millalong with Parmesan cheese and crisp Caesar Croutons, add gest."
	},
	{
		  "name":"Pulled pork - terri findley",
	  "categories":["Main dish"],
	  "yield":4,
	  "ingredients":[
	    {"section":"Ingredients", "ingredients":[{"qty":"1 1/2", "unit":"c","name":"barbque sauce"},{"qty":"1/2", "unit":"c","name":"chopped onion"},{"qty":"1/4", "unit":"c","name":"ketchup"},{"qty":"1/4", "unit":"c","name":"brown sugar"},{"qty":"1", "unit":"lb","name":"boneless pork lion"},{"qty":"1", "unit":"ts","name":"salt"},{"qty":"1", "unit":"ts","name":"ground black pepper"},{"qty":"1/2", "unit":"ts","name":"chili powder (optional)"}]}
  ],
	  "instructions":"Stir barbque sauce, onion, ketchup, brown sugar, salt, pepper andchili power in slow cooker.  Add pork loin and coat with sauce.Cover and cook on high until pork is very tender, about 4 1/2 hours.Shred pork with 2 forks.  Keep warm on low until ready to serve."
	},
	{
		  "name":"Taco chicken casserole - wayne findley",
		    "categories":["Wayne's", "Main dish"],
			  "yield":8,
			    "ingredients":[
					    {"section":"Ingredients", "ingredients":[{"qty":"1", "unit":"ea","name":"chicken, cooked and chopped"},{"qty":"1", "unit":"c","name":"chicken broth"},{"qty":"1", "unit":"cn","name":"cream of mushroom soup"},{"qty":"1", "unit":"cn","name":"cream of chicken soup"},{"qty":"1", "unit":"cn","name":"rotel diced tomatoes - mild"},{"qty":"1", "unit":"ea","name":"onion, chopped"},{"qty":"1", "unit":"ea","name":"bag of nacho doritos"}]}
		    ],
				  "instructions":"1. Combine all ingredients EXCEPT chips in a bowl; mix well2. Crush chips in bag to small pieces3. Alternate layers of chicken mixture and chips in a large casseroledish.4. Bake at 350 for 45 minutes or until heated through center.Note: From Natural Gas Newsletter - I used rotisserie chicken fromWalmart. Thought a little too spicy with Regular Rotel.Prep Time: 15-20 minutesCook Time: 30-45 minutesLevel: Very EasyNutrition Facts Per Serving:Calories 386; Calories from Fat 163; Total Fat 18.1g; Saturated Fat3.2g Cholesterol 57mg; Sodium 920mg; Total Carbohydrate 30.3g;Dietary Fiber 1.8g; Sugars 1.9g; Protein 25.6g"
	},
	{
		  "name":"Slow cooker chicken chili - rachel dewberry",
		    "categories":["Main dish", "Poultry", "Wayne's"],
			  "yield":6,
			    "ingredients":[
					    {"section":"Ingredients", "ingredients":[{"qty":"1", "unit":"ea","name":"red onion, chopped"},{"qty":"16", "unit":"oz","name":"can black beans"},{"qty":"16", "unit":"oz","name":"can kidney beans"},{"qty":"8", "unit":"oz","name":"can tomato sauce"},{"qty":"29", "unit":"oz","name":"rotel (2 cans)"},{"qty":"1", "unit":"ea","name":"packet taco seasoning"},{"qty":"1", "unit":"x","name":"salt & pepper to taste"},{"qty":"5", "unit":"ea","name":"boneless skinless chicken br"}]}
		    ],
				  "instructions":"1. Combine beans, onion, rotel, tomato sauce, and taco seasoning.2. Place chicken on top & cover with a thin layer of the sauce &beans. 3. Cook on high for 6 hours.4. About a half hour before serving, remove chicken and shred in aseparate bowl.5. Place shredded chicken into the slow cooker and stir in to combinewith beans, etc.6. Cover and place slow cooker on \"warm\" setting for 30 minutes toallow chicken to soak in the chili flavor."
	},
	{
		  "name":"Chocolate mint sticks",
		    "categories":["Desserts", "Cookies"],
			  "yield":40,
			    "ingredients":[
					    {"section":"COOKIE", "ingredients":[{"qty":"2", "unit":"ea","name":"eggs"},{"qty":"1/2", "unit":"c","name":"melted butter"},{"qty":"1", "unit":"c","name":"sugar"},{"qty":"2", "unit":"oz","name":"unsweetened chocolate melted"},{"qty":"1/2", "unit":"t","name":"peppermint extract"},{"qty":"1/2", "unit":"c","name":"flour"},{"qty":"1/2", "unit":"c","name":"ground almonds"}]},
				    {"section":"PEPPERMINT FILLING", "ingredients":[{"qty":"2", "unit":"T","name":"butter"},{"qty":"1", "unit":"T","name":"heavy cream"},{"qty":"1", "unit":"c","name":"confectioners sugar (sifted)"},{"qty":"1", "unit":"t","name":"peppermint extract"}]},
					    {"section":"FROSTING", "ingredients":[{"qty":"1", "unit":"oz","name":"semi-sweet chocolate"},{"qty":"1", "unit":"T","name":"butter"}]}
		    ],
				  "instructions":"1. Preheat oven to 350. Grease a 9 inch square baking pan. Beat eggs.Add melted butter and sugar. Beat well. Add melted chocolate andpeppermint. Beat. Add flour and nuts. Mix well. Pour ingredients intoprepared pan and bake 25-30 minutes until toothpick inserted incenter comes out clean. Remove from oven and set on trivet or rack to cool. 2. Prepare filling. In small bowl, thoroughly blend butter and cream.Add sugar and peppermint. Mix well. Spread evenly over cooled bakedlayer.tt3. Prepare frosting. Melt chocolate and butter together in small panover low heat.tt4. When filling is completely firm, spread frosting mixture on top.tt5 . Refrigerate until chocolate is firm. Cut into 3/4 by 2 1/4 inchstrips.ttfrom: _Cookiemania_"
	}
	];
	$scope.recipeList = rs;
	$scope.open = null;
	$scope.openTop = false;
	$scope.active = null;

	$scope.toggleOpen = function(r, t) {
		r.active = true;
		if ($scope.active && $scope.active != r) {
			$scope.active.active = false;
		}
		$scope.active = r;
		if (r.open) {
			r.open = false;
			$scope.open = null;
			$scope.openTop = false;
		} else {
			r.open = true;

			if ($scope.open) {
				$scope.open.open = false;
			}
			$scope.open = r;
			if (!t) {
				$scope.openTop = true;
			}
		}
	};

	$scope.toggleActive = function(r) {
		if (r.active) {
			r.active = false;
			$scope.active = null;
		} else {
			console.log("Setting " + r.name + " to active");
			r.active = true;
			if ($scope.active) {
				$scope.active.active = false;
			}
			$scope.active = r;
		}
	};
});
