class GamesController < ApplicationController
  
  def new
    @new_game = Game.new
    @new_game.game_date = DateTime.new(2025,1,1)
    @new_game.epoch_date = DateTime.jd(2451545)
    @new_game.save
    sol_system = @new_game.systems.create(:name => 'Sol',:discovered => true)
    sol_star = sol_system.stars.create(:name => 'A',:classification => 'G2V',:radius => 696000,:mass => 1.9891e10,:orbit => 0)
    sol_planets = [
      { :name => "Mercury",
        :type => "Terrestrial",
        :radius => "2439",
        :mass => "3.3022e23",
        :mean_temp => "66",
        :gravity => ".38",
        :smaxis => "57909100",
        :arg_peri => ".508309",
        :mean_anomoly => "174.796" },
      { :name => "Venus",
        :type => "Terrestrial",
        :radius => "6051",
        :mass => "4.8685e24",
        :mean_temp => "460",
        :gravity => ".904",
        :smaxis => "108208930",
        :arg_peri => ".95735",
        :mean_anomoly => ".88046" },
      { :name => "Earth",
        :type => "Terrestrial",
        :radius => "6371",
        :mass => "5.9736e24",
        :mean_temp => "14",
        :gravity => ".99732",
        :smaxis => "149598261",
        :arg_peri => "1.99330",
        :mean_anomoly => "6.23985" },
      { :name => "Mars",
        :type => "Terrestrial",
        :radius => "3396",
        :mass => "6.4185e23",
        :mean_temp => "-63",
        :gravity => ".376",
        :smaxis => "227939100",
        :arg_peri => "5.00101",
        :mean_anomoly => ".33783" },
      { :name => "Jupiter",
        :type => "Gas Giant",
        :radius => "69911",
        :mass => "1.8986e27",
        :mean_temp => "-108",
        :gravity => "2.528",
        :smaxis => "778547200",
        :arg_peri => "4.80080",
        :mean_anomoly => ".328436" },
      { :name => "Saturn",
        :type => "Gas Giant",
        :radius => "60268",
        :mass => "5.6846e26",
        :mean_temp => "-139",
        :gravity => "1.065",
        :smaxis => "1433449370",
        :arg_peri => "5.86454",
        :mean_anomoly => "5.59109"},
      { :name => "Uranus",
        :type => "Gas Giant",
        :radius => "25559",
        :mass => "8.6810e25",
        :mean_temp => "-199",
        :gravity => ".886",
        :smaxis => "2876679082",
        :arg_peri => "1.68495",
        :mean_anomoly => "2.49503"},
      { :name => "Neptune",
        :type => "Gas Giant",
        :radius => "24764",
        :mass => "1.0243e26",
        :mean_temp => "-201",
        :gravity => "1.14",
        :smaxis => "4503443661",
        :arg_peri => "4.63641",
        :mean_anomoly => "4.67342"},]
    sol_star.planets.create(sol_planets)
    render :show
  end
  
  def show
    @our_game = Game.find(params[:id])
  end
end