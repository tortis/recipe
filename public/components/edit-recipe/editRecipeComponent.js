(function(window, angular) {
    angular.module('recipe.edit', [
        'ui.bootstrap'
    ])
    .component('editRecipe', {
        transclude: true,
        bindings: {
            recipe: '=?'
        },
        controller: ['Recipe', function(Recipe) {
            var self = this;
            if (this.recipe) {
                var mod = angular.copy(this.recipe);
                this.recipe.mod = mod;
            } else {
                this.recipe = {
                    mod: {
                        name: '',
                        author: '',
                        tags: [],
                        ingredients: [{list: []}],
                        instructions: [{content: ''}]
                    }
                };
            }

            this.newIngredient = {};

            this.addIngredient = function(sectionIndex) {
                if (self.newIngredient.name == null || self.newIngredient.qty == null || self.newIngredient.unit == null) {
                    return;
                }
                self.recipe.mod.ingredients[sectionIndex].list.push(self.newIngredient);
                self.newIngredient = {};
                document.getElementById('ing-qty').focus();
            };

            this.meta = Recipe.meta();
        }],
        templateUrl: '/components/edit-recipe/edit-recipe-view.html'
    });
})(window, window.angular);
