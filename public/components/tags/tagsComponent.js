(function(window, angular) {
    angular.module('recipe.tags', [])
    .component('tagsEdit', {
        bindings: {
            tags: '=',
            list: '=?'
        },
        controller: function() {
            var self = this;
            if (!this.list) this.list = [];

            this.keyHandler = function(event) {
                if (event.keyCode == 13 || event.keyCode == 188 || event.keyCode == 9) {
                    event.preventDefault();
                    if (self.newTag == '') return;
                    if (self.tags.indexOf(self.newTag.toLowerCase()) != -1) {
                        self.newTag = '';
                        return;
                    }
                    self.tags.push(self.newTag.toLowerCase());
                    self.newTag = '';
                } else if (event.keyCode == 8) {
                    if (!self.newTag || self.newTag == '') {
                        self.tags.pop();
                        event.preventDefault();
                    }
                }
            };
        },
        template: `
<div class="form-control gd-tags">
    <div>
        <span class="label label-primary" ng-repeat="tag in $ctrl.tags track by $index" ng-click="$ctrl.tags.splice($index, 1)">{{tag}}</span>
    </div>
    <input type="text" ng-model="$ctrl.newTag" ng-keydown="$ctrl.keyHandler($event)" placeholder="Type a tag" typeahead="tag for tag in $ctrl.list | filter:$viewValue | limitTo:8">
</div>`
    });
})(window, window.angular);
