'use strict';

class QuestionController {

  constructor(API_URL, $http, $state, $stateParams, $rootScope) {
    'ngInject';

    this.apiQueryURL = 
        `${API_URL}/questions/${$stateParams.id}?order=desc&sort=activity&site=stackoverflow&filter=!-*f(6rc.(Xr5`;

    $rootScope.loadingProcess = true;

    /** load question data and render **/
    $http.get(this.apiQueryURL, { cache: true }).then((response) => {
        $rootScope.loadingProcess = false;
        if (response.data.items.length) {
            const [ item ] = response.data.items;
            Object.assign(this, item);

            /** additional: date time **/
            this.localizedCreationDate = 
                new Date(this.creation_date * 1000)
                    .toLocaleString('ru-RU', {hour12: false});
                
            if (this.answers) {
                this.answers = this.answers.map((answer) => {
                    answer.localizedCreationDate = 
                        new Date(answer.creation_date * 1000)
                            .toLocaleString('ru-RU', {hour12: false});
                    return answer;
                });
            }
            
        } else {
            state.go('main');
        }
    }, () => {
        $rootScope.loadingProcess = false;
        $state.go('main');
    });
  }

}

export default QuestionController;
