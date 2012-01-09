xml.instruct!
@our_system.stars.each do |star|
  xml.star do
    xml.name star.name
    xml.smaxis star.orbit
    star.planets.each do |planet|
      xml.planet do
        xml.name planet.name
        xml.smaxis planet.smaxis
        xml.arg_peri planet.arg_peri
        xml.mean_anomoly planet.mean_anomoly
      end
    end
  end
end
