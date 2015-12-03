var RecipeControllers = angular.module('RecipeControllers');

RecipeControllers.factory('Recipe', ['$resource',
    function($resource) {
        var Recipe = $resource('/api/recipes/:id', {
            id: '@linkName'
        }, {
            meta: {
                method: 'GET',
                url: '/api/recipes/meta'
            }
        });

        return Recipe;
    }
]);

RecipeControllers.factory('recipeListMgr', ['$location', 'Recipe',
    function($location, Recipe) {
        var RLM = {
            listeners: [],
            list: []
        };

        RLM.load = function() {
            Recipe.query($location.search(), function(rs, h) {
                RLM.stats = {}
                var headers = h();
                RLM.stats.resultCount = parseInt(headers['result-count']);
                RLM.stats.limit = parseInt(headers['result-limit']);
                RLM.stats.page = parseInt(headers['result-page']);
                RLM.stats.q = headers['result-q'];

                RLM.stats.from = (RLM.stats.page-1)*RLM.stats.limit + 1;
                RLM.stats.to = Math.min(RLM.stats.resultCount, RLM.stats.from+RLM.stats.limit);
                RLM.list = rs;
                RLM.alertListeners();
            });
        };

        RLM.alertListeners = function() {
            for (var i = 0; i < RLM.listeners.length; i++) {
                if (RLM.listeners[i])
                    RLM.listeners[i]();
            }
        };

        RLM.addListener = function(l) {
            RLM.listeners.push(l);
        };

        return RLM;
    }
]);
