import React, { Component } from "react";
 
class Home extends Component {
  render() {
      return (
          <div>
              <h1>QUIZ ME</h1>

              <div>
                  <View style={{ flexDirection: "row" }}>
                      <View style={styles.buttonStyle}>
                          <Button>Take A Quiz</Button>
                      </View>
                      <View style={styles.buttonStyle}>
                          <Button>Score</Button>
                      </View>
                  </View>
              </div>
          </div>
      );
  }
}
 
export default Home;
