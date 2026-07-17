var low_theta = [0.7, 0.8, 0.9]; //low groupings of theta
var medium_theta = [1.0, 1.1, 1.2]; //medium groupings of theta
var high_theta = [1.3, 1.4, 1.5]; //high groupings of theta
var theta_group1 = [1, 2];
var theta_group2 = [3, 2];
var theta_group3 = [2, 1];
var theta_group4 = [2, 3];
var prev_theta = 0;
var i = 0; //indexing
var final_sequence = new Array(1);
var delta_theta = 0.3;

function random_theta_change() {
    if (group_number == 'Change_1'){
        theta_group = theta_group1;
    }else if (group_number == 'Change_2'){
        theta_group = theta_group2;
    }else if (group_number == 'Change_3'){
        theta_group = theta_group3;
    }else if (group_number == 'Change_4'){
        theta_group = theta_group4;
    }else if (group_number == 'testing'){
        theta_group = theta_group2;
    }

    //creating sequence
    var trial_sets = [5, 5];
    var theta_index = new Array(theta_group.length);
    final_sequence[0] = 1; // practice theta
    
    p = 1;
    for (i = 0; i < theta_group.length; i++){
        if (i == 0){
            if (theta_group[i] == 1){
                theta_index[i] = Math.floor(Math.random() * (low_theta.length));
                theta_val = low_theta[theta_index[i]];
                for (n = p; n < p + trial_sets[i]; n++){
                    final_sequence.push(theta_val);
                }
            } else if (theta_group[i] == 2){
                theta_index[i] = Math.floor(Math.random() * (medium_theta.length));
                theta_val = medium_theta[theta_index[i]];
                for (n = p ; n < p + trial_sets[i]; n++){
                    final_sequence.push(theta_val);
                }
            } else if (theta_group[i] == 3){
                theta_index[i] = Math.floor(Math.random() * (high_theta.length));
                theta_val = high_theta[theta_index[i]];
                for (n = p ; n < p + trial_sets[i]; n++){
                    final_sequence.push(theta_val);
                }
            }
            prev_theta = theta_val;
        }
        if (i > 0) {
            if (theta_group[i] > theta_group[i-1]){
                theta_val = Math.round((theta_val + delta_theta)*10)/10;
                if (theta_val - prev_theta <= 0.2){
                    theta_val = prev_theta + 0.3;
                }
                for (n = p; n < p + trial_sets[i]; n++){
                    final_sequence.push(theta_val);
                }
            } else if (theta_group[i] < theta_group[i-1]){
                theta_val = Math.round((theta_val - delta_theta)*10)/10;
                if (prev_theta - theta_val <= 0.2){
                    theta_val = prev_theta - 0.3;
                }
                for (n = p; n < p + trial_sets[i]; n++){
                    final_sequence.push(theta_val);
                }
            }
            if (n == total_trials){
                i = i + 1;
            }
            prev_theta = theta_val;
        }

    p = p + trial_sets[i];
    }
    return final_sequence;
}

function random_theta_const() {
    //three groups
    if (group_number == 'Const_1'){
        theta_group = 1;
    }else if (group_number == 'Const_2'){
        theta_group = 2;
    }else if (group_number == 'Const_3'){
        theta_group = 3;
    }

    //creating sequencer
    var theta_index;
    final_sequence[0] = 1; // practice theta

    if (theta_group == 1) {
		theta_index = Math.floor(Math.random() * (low_theta.length)); 
		theta_val = low_theta[theta_index];

	} else if (theta_group == 2) {
		theta_index = Math.floor(Math.random() * (medium_theta.length)); 
		theta_val = medium_theta[theta_index];
	   
	} else if (theta_group == 3) {
		theta_index = Math.floor(Math.random() * (high_theta.length)); 
		theta_val = high_theta[theta_index];
	}

    for ( i = 1; i < total_trials + 1; i++){
    final_sequence.push(theta_val);
    }

    return final_sequence;
}