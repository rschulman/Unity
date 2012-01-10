xml.instruct!
xml.system do
  xml.epoch_diff (@our_system.game.game_date - @our_system.game.epoch_date).to_i
  @our_system.stars.each do |star|
    xml.star do
      xml.name star.name
      xml.mass star.mass
      xml.smaxis star.orbit
      star.planets.each do |planet|
        xml.planet do
          xml.name planet.name
          xml.smaxis planet.smaxis
          xml.mass planet.mass
          xml.arg_peri planet.arg_peri
          xml.mean_anomoly planet.mean_anomoly
        end
      end
    end
  end
end
